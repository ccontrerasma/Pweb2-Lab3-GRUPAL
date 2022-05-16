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

app.post("/getmarkdown", (request, response) => {
  const { fileName } = request.body;
  fs.readFile(
    path.resolve(__dirname, `public/files/${fileName}`),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return response.status(500).json({
          err,
        });
      }
      response.json({
        htmlText: md.render(data),
      });
    }
  );
});

app.post("/submit", (req, res) => {
  const { name, text } = req.body;
  fs.writeFile(
    path.resolve(__dirname, `public/files/${name}.md`),
    text,
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          err,
        });
      }
      res.json({
        message: "Archivo guardado",
      });
    }
  );
});
