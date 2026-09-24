const http = require("http"), fs = require("fs"), path = require("path");
const root = "C:/Users/Admin/Downloads/Ritsu-main/Ritsu";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webmanifest": "application/manifest+json", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const f = path.resolve(root, "." + p);
  if (!f.startsWith(path.resolve(root))) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); return res.end("not found"); }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(b);
  });
}).listen(8766, "127.0.0.1", () => console.log("repo on 8766"));
