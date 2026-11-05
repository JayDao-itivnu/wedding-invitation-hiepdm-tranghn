const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const HOST = "0.0.0.0";
const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, "dist");

// Tìm slug Nhà Trai & Nhà Gái từ dist nếu có
function getSlugs() {
  let ntSlug = "nt-ac89";
  let ngSlug = "ng-8e83";
  if (fs.existsSync(DIST_DIR)) {
    const entries = fs.readdirSync(DIST_DIR);
    const nt = entries.find(e => e.startsWith("nt-"));
    const ng = entries.find(e => e.startsWith("ng-"));
    if (nt) ntSlug = nt;
    if (ng) ngSlug = ng;
  }
  return { ntSlug, ngSlug };
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".ics": "text/calendar; charset=utf-8"
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  let safeUrl = req.url.split("?")[0];
  if (safeUrl === "/") safeUrl = "/index.html";

  // Thứ tự tìm file:
  // 1. Nếu có dist/ và file tồn tại trong dist/, ưu tiên dist/
  // 2. Nếu không, tìm trong ROOT_DIR (source code gốc)
  let filePath = path.join(DIST_DIR, safeUrl);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    if (fs.existsSync(path.join(filePath, "index.html"))) {
      filePath = path.join(filePath, "index.html");
    } else {
      filePath = path.join(ROOT_DIR, safeUrl);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  const { ntSlug, ngSlug } = getSlugs();
  console.log(`\n============================================================`);
  console.log(`🎉 PREVIEW SERVER ĐANG CHẠY TẠI: http://localhost:${PORT}/`);
  console.log(`============================================================`);
  console.log(`🌐 [Cổng Chọn Thiệp Root] : http://localhost:${PORT}/`);
  console.log(`🎩 [Thiệp Mời Nhà Trai]   : http://localhost:${PORT}/nhatrai/`);
  console.log(`💐 [Thiệp Mời Nhà Gái]    : http://localhost:${PORT}/nhagai/`);
  console.log(`🔒 [Slug Hash Nhà Trai]   : http://localhost:${PORT}/${ntSlug}/`);
  console.log(`🔒 [Slug Hash Nhà Gái]    : http://localhost:${PORT}/${ngSlug}/`);
  console.log(`💌 [Test Cá Nhân Hóa]     : http://localhost:${PORT}/nhatrai/?to=B%E1%BA%A1n+Huy%E1%BB%81n`);
  console.log(`⚡ [Test Redirect Param]  : http://localhost:${PORT}/?side=nhatrai&to=B%E1%BA%A1n+Huy%E1%BB%81n`);
  console.log(`============================================================\n`);
});
