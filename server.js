require("dotenv").config();

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const htmlFilePath = path.resolve(__dirname, process.env.HTML_PATH);
const port = process.env.PORT || 8888;

app.get("/", (_, res) => {
  fs.readFile(
    path.resolve(htmlFilePath, "index.html"),
    "utf-8",
    (err, contents) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          date: new Date(),
          status: "ERROR",
          error: err,
        });
      }
      if (contents && contents.length > 1) {
        return res.status(200).send(contents);
      } else {
        return res.status(204);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on Port ${port}`);
});
