#!/usr/bin/env node
/**
 * ==============================================================================
 * BUILD SCRIPT - Wedding Invitation Dual-Side Deployment
 * Generates separate deployable folders for Nhà Trai & Nhà Gái
 * with both clean semantic URLs (/nhatrai/, /nhagai/) and randomized slugs,
 * plus an elegant Gateway Portal at root (/).
 * ==============================================================================
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// --- Configuration ---
const SRC_DIR = __dirname;
const DIST_DIR = path.join(SRC_DIR, "dist");

// Deterministic random slugs derived from a secret + side name (backward compatibility)
const DEPLOY_SECRET = process.env.DEPLOY_SECRET || "wedding-hiep-trang-2026";

function generateSlug(side) {
  const hash = crypto.createHash("sha256").update(DEPLOY_SECRET + side).digest("hex");
  const prefix = side === "nhatrai" ? "nt" : "ng";
  return `${prefix}-${hash.substring(0, 4)}`;
}

const SIDE_NHATRAI_SLUG = generateSlug("nhatrai"); // nt-ac89
const SIDE_NHAGAI_SLUG = generateSlug("nhagai");   // ng-8e83

// Files and folders to copy for each side
const COPY_FILES = [
  "index.html",
  "styles.css",
  "app.js",
  "logo-cuoi-H-T-tach-nen-2048px.svg",
];
const COPY_DIRS = ["audio", "icons", "assets"];

// --- Helpers ---
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  ensureDir(destDir);
  fs.copyFileSync(src, dest);
}

// --- Load source config ---
function loadConfig() {
  const configPath = path.join(SRC_DIR, "config.js");
  delete require.cache[require.resolve(configPath)];
  const { WEDDING_CONFIG } = require(configPath);
  return WEDDING_CONFIG;
}

// --- Build side-specific config.js ---
function buildSideConfig(config, side) {
  // Deep clone the config
  const sideConfig = JSON.parse(JSON.stringify(config));

  const eventData = side === "nhatrai" ? config.event_nhatrai : config.event_nhagai;

  if (!eventData) {
    console.warn(`⚠️  No event data found for side "${side}". Using default event.`);
    return sideConfig;
  }

  // Replace the event object with the side-specific data
  sideConfig.event = {
    dateTimeStr: eventData.dateTimeStr,
    solarDate: eventData.solarDate,
    lunarDate: eventData.lunarDate || config.event_shared?.lunarDate || "",
    venue: { ...eventData.venue },
    timeline: [...eventData.timeline],
    dresscode: config.event_shared?.dresscode || config.event?.dresscode || {},
    event_side: eventData.event_side,
    event_side_label: eventData.event_side_label,
  };

  // Add QR info if present
  if (eventData.qr) {
    sideConfig.event.qr = { ...eventData.qr };
  }

  // Merge i18n overrides into the language dictionaries (supporting both lang_vi and vi keys)
  if (eventData.i18n_overrides) {
    for (const [key, overrides] of Object.entries(eventData.i18n_overrides)) {
      const langCode = key.replace(/^lang_/, "");
      if (sideConfig.i18n?.languages?.[langCode]) {
        Object.assign(sideConfig.i18n.languages[langCode], overrides);
      }
    }
  }

  // Remove the other side's event data and shared data (strict privacy: no trace of the other side)
  delete sideConfig.event_nhatrai;
  delete sideConfig.event_nhagai;
  delete sideConfig.event_shared;

  return sideConfig;
}

// --- Build side-specific index.html with updated OG meta tags & static venue info ---
function buildSideHtml(htmlContent, config, side) {
  const eventData = side === "nhatrai" ? config.event_nhatrai : config.event_nhagai;
  if (!eventData) return htmlContent;

  const viOverrides = eventData.i18n_overrides?.lang_vi || eventData.i18n_overrides?.vi || {};

  // Update og:title & title
  const ogTitle = viOverrides.seo_title || config.seo?.title || "";
  if (ogTitle) {
    htmlContent = htmlContent.replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${escapeHtmlAttr(ogTitle)}$2`
    );
    htmlContent = htmlContent.replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${escapeHtmlAttr(ogTitle)}$2`
    );
    htmlContent = htmlContent.replace(
      /(<title[^>]*>)[^<]*(<\/title>)/,
      `$1${escapeHtml(ogTitle)}$2`
    );
  }

  // Update og:description & description
  const ogDesc = viOverrides.seo_description || config.seo?.description || "";
  if (ogDesc) {
    htmlContent = htmlContent.replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${escapeHtmlAttr(ogDesc)}$2`
    );
    htmlContent = htmlContent.replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${escapeHtmlAttr(ogDesc)}$2`
    );
    htmlContent = htmlContent.replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${escapeHtmlAttr(ogDesc)}$2`
    );
  }

  // Update static text fallbacks for crawlers & noscript
  if (viOverrides.venue_name) {
    htmlContent = htmlContent.replace(
      /(<h3\b[^>]*\bdata-i18n="venue_name"[^>]*>)([\s\S]*?)(<\/h3>)/,
      `$1\n            ${escapeHtml(viOverrides.venue_name)}\n          $3`
    );
  }
  if (viOverrides.venue_hall) {
    htmlContent = htmlContent.replace(
      /(<p\b[^>]*\bdata-i18n="venue_hall"[^>]*>)([\s\S]*?)(<\/p>)/,
      `$1${escapeHtml(viOverrides.venue_hall)}$3`
    );
  }
  if (viOverrides.venue_address) {
    htmlContent = htmlContent.replace(
      /(<span\b[^>]*\bdata-i18n="venue_address"[^>]*>)([\s\S]*?)(<\/span>)/,
      `$1${escapeHtml(viOverrides.venue_address)}$3`
    );
  }
  if (viOverrides.venue_time) {
    htmlContent = htmlContent.replace(
      /(<span\b[^>]*\bdata-i18n="venue_time"[^>]*>)([\s\S]*?)(<\/span>)/,
      `$1${escapeHtml(viOverrides.venue_time)}$3`
    );
  }
  if (viOverrides.footer_date) {
    htmlContent = htmlContent.replace(
      /(<p\b[^>]*\bdata-i18n="footer_date"[^>]*>)([\s\S]*?)(<\/p>)/,
      `$1\n        ${escapeHtml(viOverrides.footer_date)}\n      $3`
    );
  }

  // Update venue map navigation link and iframe embed
  if (eventData.venue?.mapsNavigationUrl) {
    htmlContent = htmlContent.replace(
      /(<a\b[^>]*\bid="venue-map-link"[^>]*\bhref=")[^"]*(")/,
      `$1${escapeHtmlAttr(eventData.venue.mapsNavigationUrl)}$2`
    );
  }
  if (eventData.venue?.mapsEmbedIframeUrl) {
    htmlContent = htmlContent.replace(
      /(<iframe\b[^>]*\bid="venue-map-iframe"[^>]*\bsrc=")[^"]*(")/,
      `$1${escapeHtmlAttr(eventData.venue.mapsEmbedIframeUrl)}$2`
    );
  }

  return htmlContent;
}

// --- Build root index.html (Gateway Portal & Smart Router) ---
function buildRootHtml(config) {
  const groomName = config.couple?.groom?.name || "Mạnh Hiệp";
  const brideName = config.couple?.bride?.name || "Huyền Trang";
  const logo = config.couple?.logo || "logo-cuoi-H-T-tach-nen-2048px.svg";
  const shareImage = config.seo?.shareImage || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  const themeColor = config.seo?.themeColor || "#721121";

  const nt = config.event_nhatrai || {};
  const ng = config.event_nhagai || {};

  const ntTime = nt.i18n_overrides?.lang_vi?.venue_time || nt.dateTimeStr || "18:00 - Thứ Bảy, 26/12/2026";
  const ntVenue = nt.venue?.name || "Nguyên Đình Long Biên";
  const ntAddress = nt.venue?.address || "TASCO Mall, Long Biên, Hà Nội";

  const ngTime = ng.i18n_overrides?.lang_vi?.venue_time || ng.dateTimeStr || "10:30 - Thứ Bảy, 26/12/2026";
  const ngVenue = ng.venue?.name || "Trống Đồng Palace";
  const ngAddress = ng.venue?.address || "72 Trần Đăng Ninh, Cầu Giấy, Hà Nội";

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${themeColor}" />
  <title>Lễ Thành Hôn: ${groomName} & ${brideName} | 26.12.2026</title>
  <meta name="description" content="Trân trọng kính mời quý khách tham dự Lễ thành hôn của ${groomName} & ${brideName} vào ngày 26/12/2026 tại Hà Nội." />
  
  <!-- Open Graph / Zalo / Facebook Sharing -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Lễ Thành Hôn: ${groomName} & ${brideName} | 26.12.2026" />
  <meta property="og:description" content="Trân trọng kính mời quý khách tham dự ngày hạnh phúc của ${groomName} & ${brideName} vào ngày 26/12/2026." />
  <meta property="og:image" content="${shareImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Lễ Thành Hôn: ${groomName} & ${brideName} | 26.12.2026" />
  <meta name="twitter:description" content="Trân trọng kính mời quý khách tham dự ngày hạnh phúc của ${groomName} & ${brideName}." />
  <meta name="twitter:image" content="${shareImage}" />

  <link rel="icon" type="image/svg+xml" href="${logo}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <script>
    // --- Smart Client-Side Router ---
    // If URL contains ?side=nhatrai or ?side=nhagai, redirect instantly preserving all other params (e.g. ?to=...)
    (function() {
      var params = new URLSearchParams(window.location.search);
      var side = (params.get("side") || "").toLowerCase().trim();
      var search = window.location.search;
      if (side === "nhatrai" || side === "trai" || side === "groom") {
        window.location.replace("./nhatrai/" + search);
      } else if (side === "nhagai" || side === "gai" || side === "bride") {
        window.location.replace("./nhagai/" + search);
      }
    })();
  </script>

  <style>
    body {
      background-color: #F9F6F0;
      color: #2B090E;
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: radial-gradient(rgba(197, 160, 89, 0.12) 1px, transparent 1px);
      background-size: 24px 24px;
    }
    .gold-line {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #C5A059, transparent);
      margin: 1rem auto;
    }
    .portal-card {
      background: #FFFFFF;
      border: 1px solid rgba(197, 160, 89, 0.35);
      border-radius: 1.25rem;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 10px 25px -5px rgba(114, 17, 33, 0.05), 0 8px 10px -6px rgba(114, 17, 33, 0.03);
    }
    .portal-card:hover {
      transform: translateY(-4px);
      border-color: #C5A059;
      box-shadow: 0 20px 30px -10px rgba(114, 17, 33, 0.12);
    }
    .btn-side {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.85rem 1.25rem;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.03em;
      transition: all 0.25s ease;
      text-decoration: none;
    }
    .btn-nhatrai {
      background: #721121;
      color: #F9F6F0;
      border: 1px solid #721121;
    }
    .btn-nhatrai:hover {
      background: #5E0B15;
      box-shadow: 0 8px 20px rgba(114, 17, 33, 0.25);
    }
    .btn-nhagai {
      background: #C5A059;
      color: #2B090E;
      border: 1px solid #C5A059;
    }
    .btn-nhagai:hover {
      background: #B38E46;
      box-shadow: 0 8px 20px rgba(197, 160, 89, 0.35);
    }
  </style>
</head>
<body class="py-12 px-4 sm:px-6">
  <main class="w-full max-w-2xl mx-auto text-center">
    
    <!-- Monogram Official Logo -->
    <div class="mb-5 inline-block">
      <img src="${logo}" alt="H & T Monogram" class="w-28 h-28 sm:w-32 sm:h-32 mx-auto drop-shadow-md transition-transform hover:scale-105 duration-300" />
    </div>

    <!-- Personalized Welcome Badge (Shown if ?to= is present) -->
    <div id="portal-greeting" class="hidden inline-flex items-center gap-2 py-1.5 px-4 mb-4 rounded-full bg-[#721121]/5 border border-[#C5A059]/40 text-[#721121] text-xs sm:text-sm font-medium">
      <span>💌</span>
      <span>Trân trọng kính mời: <strong id="portal-guest-name" class="font-semibold text-[#721121]"></strong></span>
    </div>

    <!-- Subtitle -->
    <p class="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#C5A059] font-medium mb-1.5">
      NGÀY CHUNG ĐÔI • 26 . 12 . 2026
    </p>

    <!-- Couple Names -->
    <h1 style="font-family:'Playfair Display',serif; font-size:clamp(30px,7vw,54px); color:#721121; font-weight:700; line-height:1.2; margin-bottom:0.25rem;">
      ${groomName} <span style="font-family:'Great Vibes',cursive; color:#C5A059; font-weight:400; font-size:1.15em;">&</span> ${brideName}
    </h1>

    <div class="gold-line"></div>

    <!-- Quote -->
    <p class="text-sm sm:text-base text-[#5A4744] max-w-md mx-auto italic leading-relaxed" style="font-family:'Playfair Display',serif;">
      "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước."
    </p>

    <p class="text-xs sm:text-sm text-[#5A4744]/75 mt-3 mb-8">
      Trân trọng kính mời quý khách lựa chọn thiệp mời để xem chi tiết thời gian & địa điểm hôn lễ:
    </p>

    <!-- Dual-Side Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
      
      <!-- Nhà Trai Card -->
      <div class="portal-card p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#721121]/10 text-[#721121] border border-[#721121]/20">
              🎩 Nhà Trai
            </span>
            <span class="text-xs text-[#C5A059] font-medium tracking-wide">Tiệc Buổi Chiều</span>
          </div>

          <h2 style="font-family:'Playfair Display',serif;" class="text-xl sm:text-2xl font-bold text-[#721121] mb-2">
            Tiệc Cưới Nhà Trai
          </h2>

          <div class="space-y-2 text-xs sm:text-sm text-[#5A4744] mb-6">
            <div class="flex items-start gap-2">
              <span class="text-[#C5A059] mt-0.5">🕒</span>
              <span class="font-medium text-[#2B090E]">${escapeHtml(ntTime)}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-[#C5A059] mt-0.5">📍</span>
              <div>
                <strong class="text-[#721121] block">${escapeHtml(ntVenue)}</strong>
                <span class="text-xs text-[#5A4744]/80">${escapeHtml(ntAddress)}</span>
              </div>
            </div>
          </div>
        </div>

        <a href="./nhatrai/" data-base-href="./nhatrai/" class="portal-card-btn btn-side btn-nhatrai">
          <span>Xem Thiệp Nhà Trai</span>
          <span>→</span>
        </a>
      </div>

      <!-- Nhà Gái Card -->
      <div class="portal-card p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#C5A059]/15 text-[#8A6A24] border border-[#C5A059]/30">
              💐 Nhà Gái
            </span>
            <span class="text-xs text-[#C5A059] font-medium tracking-wide">Tiệc Buổi Trưa</span>
          </div>

          <h2 style="font-family:'Playfair Display',serif;" class="text-xl sm:text-2xl font-bold text-[#721121] mb-2">
            Lễ Thành Hôn Nhà Gái
          </h2>

          <div class="space-y-2 text-xs sm:text-sm text-[#5A4744] mb-6">
            <div class="flex items-start gap-2">
              <span class="text-[#C5A059] mt-0.5">🕒</span>
              <span class="font-medium text-[#2B090E]">${escapeHtml(ngTime)}</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-[#C5A059] mt-0.5">📍</span>
              <div>
                <strong class="text-[#721121] block">${escapeHtml(ngVenue)}</strong>
                <span class="text-xs text-[#5A4744]/80">${escapeHtml(ngAddress)}</span>
              </div>
            </div>
          </div>
        </div>

        <a href="./nhagai/" data-base-href="./nhagai/" class="portal-card-btn btn-side btn-nhagai">
          <span>Xem Thiệp Nhà Gái</span>
          <span>→</span>
        </a>
      </div>

    </div>

    <!-- Footer Copyright -->
    <div class="mt-10 pt-6 border-t border-[#C5A059]/30">
      <p class="text-xs text-[#5A4744]/60 tracking-widest uppercase">
        ${groomName} & ${brideName} • Wedding 2026
      </p>
    </div>

  </main>

  <script>
    // Pass query params (like ?to=GuestName) to the side buttons
    document.addEventListener("DOMContentLoaded", function() {
      var params = new URLSearchParams(window.location.search);
      var to = params.get("to") || params.get("guest") || params.get("name") || "";
      var search = window.location.search;

      if (to) {
        var greetingEl = document.getElementById("portal-greeting");
        var nameEl = document.getElementById("portal-guest-name");
        if (greetingEl && nameEl) {
          nameEl.textContent = decodeURIComponent(to.replace(/\\+/g, " "));
          greetingEl.classList.remove("hidden");
        }
      }

      if (search) {
        var links = document.querySelectorAll(".portal-card-btn");
        links.forEach(function(btn) {
          var base = btn.getAttribute("data-base-href");
          if (base) {
            btn.setAttribute("href", base + search);
          }
        });
      }
    });
  </script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHtmlAttr(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Serialize config object to JS ---
function configToJS(config) {
  const jsonStr = JSON.stringify(config, null, 2);
  return `/**
 * ==============================================================================
 * WEDDING INVITATION CONFIGURATION (Auto-generated by build script)
 * Side: ${config.event?.event_side || "general"}
 * ==============================================================================
 */

const WEDDING_CONFIG = ${jsonStr};

/**
 * ==============================================================================
 * GOOGLE DRIVE IMAGE HELPER FUNCTION
 * ==============================================================================
 */
function parseGoogleDriveUrl(urlOrId, fallbackUrl = "") {
  if (!urlOrId || typeof urlOrId !== "string") {
    return fallbackUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  }

  const trimmed = urlOrId.trim();

  if (!trimmed.includes("drive.google.com") && !trimmed.includes("docs.google.com")) {
    const isBareGoogleId = /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed);
    if (!isBareGoogleId) {
      return trimmed;
    }
  }

  let fileId = "";
  const matchFileD = trimmed.match(/\\/file\\/d\\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    fileId = matchFileD[1];
  }

  if (!fileId) {
    const matchIdParam = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (matchIdParam && matchIdParam[1]) {
      fileId = matchIdParam[1];
    }
  }

  if (!fileId && /^[a-zA-Z0-9_-]{25,50}$/.test(trimmed)) {
    fileId = trimmed;
  }

  if (fileId) {
    return "https://lh3.googleusercontent.com/d/" + fileId;
  }

  return trimmed || fallbackUrl;
}

if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
  window.parseGoogleDriveUrl = parseGoogleDriveUrl;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WEDDING_CONFIG, parseGoogleDriveUrl };
}
`;
}

// --- Helper: Emit a side folder with assets ---
function emitSideFolder(targetDir, sideConfig, sideHtml) {
  ensureDir(targetDir);
  fs.writeFileSync(path.join(targetDir, "config.js"), configToJS(sideConfig), "utf8");
  fs.writeFileSync(path.join(targetDir, "index.html"), sideHtml, "utf8");

  COPY_FILES.filter(f => f !== "index.html" && f !== "config.js").forEach(f => {
    const src = path.join(SRC_DIR, f);
    if (fs.existsSync(src)) copyFile(src, path.join(targetDir, f));
  });

  COPY_DIRS.forEach(d => {
    const src = path.join(SRC_DIR, d);
    if (fs.existsSync(src)) copyDir(src, path.join(targetDir, d));
  });
}

// --- Main Build ---
function build() {
  console.log("🏗️  Building Wedding Invitation for GitHub Pages...\n");

  const config = loadConfig();

  // Clean dist
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
  }
  ensureDir(DIST_DIR);

  const htmlSource = fs.readFileSync(path.join(SRC_DIR, "index.html"), "utf8");

  // --- Prepare Nhà Trai ---
  const ntConfig = buildSideConfig(config, "nhatrai");
  const ntHtml = buildSideHtml(htmlSource, config, "nhatrai");

  // Emit Nhà Trai to semantic and hashed folders
  const ntPaths = ["nhatrai", "nha-trai", SIDE_NHATRAI_SLUG];
  ntPaths.forEach(slug => {
    emitSideFolder(path.join(DIST_DIR, slug), ntConfig, ntHtml);
    console.log(`✅ Nhà Trai built → dist/${slug}/`);
  });

  // --- Prepare Nhà Gái ---
  const ngConfig = buildSideConfig(config, "nhagai");
  const ngHtml = buildSideHtml(htmlSource, config, "nhagai");

  // Emit Nhà Gái to semantic and hashed folders
  const ngPaths = ["nhagai", "nha-gai", SIDE_NHAGAI_SLUG];
  ngPaths.forEach(slug => {
    emitSideFolder(path.join(DIST_DIR, slug), ngConfig, ngHtml);
    console.log(`✅ Nhà Gái built → dist/${slug}/`);
  });

  // --- Build Root Gateway Portal ---
  const rootHtml = buildRootHtml(config);
  fs.writeFileSync(path.join(DIST_DIR, "index.html"), rootHtml, "utf8");
  
  // Copy logo to root
  const logoSrc = path.join(SRC_DIR, config.couple?.logo || "logo-cuoi-H-T-tach-nen-2048px.svg");
  if (fs.existsSync(logoSrc)) {
    copyFile(logoSrc, path.join(DIST_DIR, path.basename(logoSrc)));
  }
  console.log(`✅ Root Gateway Portal built → dist/index.html`);

  // --- Summary ---
  console.log("\n==============================================================");
  console.log("💍 DUAL-SIDE DEPLOYMENT SUMMARY");
  console.log("==============================================================");
  console.log("🌐 Trang Chủ Cổng Chọn Thiệp:  /");
  console.log("🎩 Thiệp Mời Nhà Trai (URL đẹp):  /nhatrai/ (hoặc /nha-trai/)");
  console.log("💐 Thiệp Mời Nhà Gái (URL đẹp):   /nhagai/ (hoặc /nha-gai/)");
  console.log("🔒 Thiệp Mời Slug Bí Mật (Hash):  /" + SIDE_NHATRAI_SLUG + "/ & /" + SIDE_NHAGAI_SLUG + "/");
  console.log("⚡ Hỗ trợ tham số URL tại Root:   /?side=nhatrai&to=Tên+Khách");
  console.log(`📦 Tổng dung lượng thư mục dist:  ${(getDirSize(DIST_DIR) / (1024 * 1024)).toFixed(2)} MB`);
  console.log("==============================================================\n");
}

function getDirSize(dir) {
  let size = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirSize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }
  return size;
}

// Run
build();
