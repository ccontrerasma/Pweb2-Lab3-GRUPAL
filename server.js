const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
var MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();

app.use(express.static("pub"));
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Escuchando en: http://localhost:3000");
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.get("/files", (req, res) => {
  fs.readdir("./public/files/", (err, files) => {
    res.send(files);
  });
});
