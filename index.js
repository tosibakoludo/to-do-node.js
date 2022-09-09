const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer(
    (req, res) => {
        let contentType;
        let contentFile;
        contentFile = req.url;
        console.log(contentFile);
        if (req.url == "/") {
            contentFile = "index.html";
        }

        const fileExtension = path.extname(contentFile);

        switch (fileExtension) {
            case ".js": contentType = "text/javascript";
                break;
            case ".json": contentType = "application/json";
                break;
            case ".css": contentType = "text/css";
                break;
            case ".png": contentType = "image/png";
                break;
            case ".html": contentType = "text/html";
                break;
            default:
                contentType = "text/html";
        }

        const contentPath = path.join(__dirname, "public", contentFile);
        console.log(contentPath);
        fs.readFile(contentPath, (err, data) => {
            if (err) {
                if (err.code == "ENOENT") {
                    const path404 = path.join(__dirname, "public", "404.html");
                    fs.readFile(path404, (err, data) => {
                        res.writeHead(200, {
                            "Content-Type": "text/html"
                        });
                        console.log(data);
                        res.write(data);
                        res.end();
                    })
                }
                else {
                    res.writeHead(500, "server error!!!");
                    res.end();
                }
            }
            else {
                res.writeHead(200, {
                    "Content-Type": contentType
                })
                res.write(data);
                res.end();
            }
        })
    }
)

server.listen(5000, () => {
    console.log("server je pokrenut");
})