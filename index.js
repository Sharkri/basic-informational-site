import http from "http";
import fs from "fs/promises";

const pages = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact-me.html",
};

async function getFileContents(filePath) {
  try {
    const fileContents = await fs.readFile(filePath);
    return fileContents;
  } catch (error) {
    console.error("Failed to fetch file", error);
  }
}

http
  .createServer(async function (req, res) {
    const url = new URL(`http://${req.headers.host}${req.url}`);

    const content = await getFileContents(pages[url.pathname] || "404.html");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  })
  .listen(8080);
