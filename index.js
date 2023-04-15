import http from "http";
import fs from "fs/promises";

const pages = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact-me.html",
};

const port = 8080;

async function getFileContents(filePath) {
  try {
    const fileContents = await fs.readFile(filePath);
    return fileContents;
  } catch (error) {
    console.error("Failed to fetch file", error);
  }
}

const server = http.createServer(async function (req, res) {
  const htmlFile = pages[req.url] || "404.html";

  res.statusCode = htmlFile === "404.html" ? 404 : 200;

  const content = await getFileContents(htmlFile);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write(content);
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
