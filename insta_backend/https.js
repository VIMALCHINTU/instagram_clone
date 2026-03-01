const http = require("http");

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log("server hited")
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
});

server.listen(4000, () => {
    console.log("server is started");
});
