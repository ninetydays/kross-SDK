const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURI(parsedUrl.pathname);

  const filePath = path.join(__dirname, pathname);

  fs.exists(filePath, function (exists) {
    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain"
      });
      res.end("404 Not Found");
      return;
    }

    const ext = path.extname(pathname);
    let contentType = "text/plain";

    if (ext === ".jpg") {
      contentType = "image/jpeg";
    }

    res.writeHead(200, {
      "Content-Type": contentType
    });

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
}).listen(8000, "127.0.0.1");