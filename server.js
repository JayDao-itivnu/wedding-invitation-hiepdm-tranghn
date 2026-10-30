const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const HOST = "0.0.0.0"; // Lắng nghe trên tất cả các giao diện mạng (khai báo rõ ràng để các thiết bị cùng Wifi truy cập được)
const PUBLIC_DIR = __dirname;

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
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  let safeUrl = req.url.split("?")[0];
  if (safeUrl === "/") safeUrl = "/index.html";

  const filePath = path.join(PUBLIC_DIR, safeUrl);

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
  console.log(`[Preview Server] Chạy tại http://localhost:${PORT}/`);
  console.log(`[Preview Server] Thử URL cá nhân hóa: http://localhost:${PORT}/?to=B%E1%BA%A1n+Hi%E1%BB%81n`);
  console.log(`[Preview Server] TRUY CẬP TỪ ĐIỆN THOẠI CÙNG WIFI: http://192.168.1.27:${PORT}/`);
  console.log(`[Preview Server] (Thay 192.168.1.27 bằng IP máy bạn nếu khác)`);
});
