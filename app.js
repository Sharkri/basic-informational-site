const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

function getFilePath(fileName) {
  return path.join(__dirname, fileName);
}

app.get("/", (req, res) => {
  res.sendFile(getFilePath("index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(getFilePath("about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(getFilePath("contact-me.html"));
});

// 404 page
app.get("*", (req, res) => {
  res.status(404).sendFile(getFilePath("404.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
