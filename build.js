#!/usr/bin/env node
/**
 * ==============================================================================
 * BUILD SCRIPT - Wedding Invitation Dual-Side Deployment
 * Generates separate deployable folders for Nhà Trai & Nhà Gái
 * from a single source codebase, with randomized URL paths.
 * ==============================================================================
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// --- Configuration ---
const SRC_DIR = __dirname;
const DIST_DIR = path.join(SRC_DIR, "dist");

// Deterministic random slugs derived from a secret + side name
// Change DEPLOY_SECRET to regenerate new paths
const DEPLOY_SECRET = process.env.DEPLOY_SECRET || "wedding-hiep-trang-2026";

function generateSlug(side) {
  const hash = crypto.createHash("sha256").update(DEPLOY_SECRET + side).digest("hex");
  const prefix = side === "nhatrai" ? "nt" : "ng";
  return `${prefix}-${hash.substring(0, 4)}`;
}

const SIDE_NHATRAI_SLUG = generateSlug("nhatrai");
const SIDE_NHAGAI_SLUG = generateSlug("nhagai");

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

// --- Build side-specific index.html with updated OG meta tags ---
function buildSideHtml(htmlContent, config, side) {
  const eventData = side === "nhatrai" ? config.event_nhatrai : config.event_nhagai;
  if (!eventData) return htmlContent;

  const viOverrides = eventData.i18n_overrides?.lang_vi || eventData.i18n_overrides?.vi || {};

  // Update og:title
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

  // Update og:description
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

// --- Build root index.html (memorial/general page) ---
function buildRootHtml(config) {
  const groomName = config.couple?.groom?.name || "Chú Rể";
  const brideName = config.couple?.bride?.name || "Cô Dâu";
  const logo = config.couple?.logo || "logo-cuoi-H-T-tach-nen-2048px.svg";
  const shareImage = config.seo?.shareImage || "";
  const themeColor = config.seo?.themeColor || "#721121";

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="${themeColor}" />
  <title>Lễ Thành Hôn: ${groomName} & ${brideName}</title>
  <meta name="description" content="Trang kỷ niệm Lễ thành hôn của ${groomName} & ${brideName}." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Lễ Thành Hôn: ${groomName} & ${brideName}" />
  <meta property="og:description" content="Trang kỷ niệm Lễ thành hôn của ${groomName} & ${brideName}." />
  <meta property="og:image" content="${shareImage}" />
  <link rel="icon" type="image/svg+xml" href="${logo}" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    body { background: #F9F6F0; color: #2B090E; font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; min-height: 100dvh; display: flex; align-items: center; justify-content: center; }
    .gold-line { width: 60px; height: 2px; background: #C5A059; margin: 1rem auto; }
  </style>
</head>
<body>
  <div class="text-center p-8 max-w-lg mx-auto">
    <img src="${logo}" alt="Logo" class="w-40 h-40 mx-auto mb-6 drop-shadow-lg" />
    <p class="text-sm uppercase tracking-[0.3em] text-[#C5A059] mb-2" style="font-family:'Plus Jakarta Sans',sans-serif;">Save Our Date</p>
    <h1 style="font-family:'Playfair Display',serif; font-size:clamp(28px,6vw,52px); color:#721121; font-weight:700; margin-bottom:0.5rem;">
      ${groomName} <span style="font-family:'Great Vibes',cursive; color:#C5A059; font-weight:400;">&</span> ${brideName}
    </h1>
    <div class="gold-line"></div>
    <p class="text-base text-[#5A4744] mt-4 leading-relaxed" style="font-family:'Playfair Display',serif; font-style:italic;">
      "Tình yêu không chỉ là nhìn nhau, mà là cùng nhau nhìn về một hướng trên con đường phía trước."
    </p>
    <p class="text-sm text-[#5A4744]/70 mt-6">
      Trang kỷ niệm chung — Để xem thiệp mời chi tiết, vui lòng sử dụng đường link riêng được gửi tới bạn.
    </p>
    <div class="gold-line"></div>
    <p class="text-xs text-[#5A4744]/50 mt-4 uppercase tracking-widest">
      ${groomName} & ${brideName} • 2026
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeHtmlAttr(str) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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

  // --- Build Nhà Trai ---
  const ntDir = path.join(DIST_DIR, SIDE_NHATRAI_SLUG);
  ensureDir(ntDir);
  const ntConfig = buildSideConfig(config, "nhatrai");
  const ntHtml = buildSideHtml(htmlSource, config, "nhatrai");
  fs.writeFileSync(path.join(ntDir, "config.js"), configToJS(ntConfig), "utf8");
  fs.writeFileSync(path.join(ntDir, "index.html"), ntHtml, "utf8");
  COPY_FILES.filter(f => f !== "index.html" && f !== "config.js").forEach(f => {
    const src = path.join(SRC_DIR, f);
    if (fs.existsSync(src)) copyFile(src, path.join(ntDir, f));
  });
  COPY_DIRS.forEach(d => {
    const src = path.join(SRC_DIR, d);
    if (fs.existsSync(src)) copyDir(src, path.join(ntDir, d));
  });
  console.log(`✅ Nhà Trai built → dist/${SIDE_NHATRAI_SLUG}/`);

  // --- Build Nhà Gái ---
  const ngDir = path.join(DIST_DIR, SIDE_NHAGAI_SLUG);
  ensureDir(ngDir);
  const ngConfig = buildSideConfig(config, "nhagai");
  const ngHtml = buildSideHtml(htmlSource, config, "nhagai");
  fs.writeFileSync(path.join(ngDir, "config.js"), configToJS(ngConfig), "utf8");
  fs.writeFileSync(path.join(ngDir, "index.html"), ngHtml, "utf8");
  COPY_FILES.filter(f => f !== "index.html" && f !== "config.js").forEach(f => {
    const src = path.join(SRC_DIR, f);
    if (fs.existsSync(src)) copyFile(src, path.join(ngDir, f));
  });
  COPY_DIRS.forEach(d => {
    const src = path.join(SRC_DIR, d);
    if (fs.existsSync(src)) copyDir(src, path.join(ngDir, d));
  });
  console.log(`✅ Nhà Gái built → dist/${SIDE_NHAGAI_SLUG}/`);

  // --- Build Root (General Memorial Page) ---
  const rootHtml = buildRootHtml(config);
  fs.writeFileSync(path.join(DIST_DIR, "index.html"), rootHtml, "utf8");
  // Copy logo to root
  const logoSrc = path.join(SRC_DIR, config.couple?.logo || "logo-cuoi-H-T-tach-nen-2048px.svg");
  if (fs.existsSync(logoSrc)) {
    copyFile(logoSrc, path.join(DIST_DIR, path.basename(logoSrc)));
  }
  console.log(`✅ Root memorial page built → dist/index.html`);

  // --- Summary ---
  console.log("\n📦 Build complete!");
  console.log(`   Nhà Trai URL path: /${SIDE_NHATRAI_SLUG}/`);
  console.log(`   Nhà Gái URL path:  /${SIDE_NHAGAI_SLUG}/`);
  console.log(`   Root URL path:     /`);
  console.log(`\n   Total dist size: ${(getDirSize(DIST_DIR) / (1024 * 1024)).toFixed(2)} MB\n`);
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
