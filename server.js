var express = require("express");
var app = express();
const fileUpload = require("express-fileupload");
const path = require("path");

app.get("/", (req, res) => {
  res.status(200).send("welocome to the node js");
});

app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  console.log(files);

  Object.keys(files).forEach((key) => {
    const filepath = path.join(__dirname, "files", files[key].name);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });

  return res.json({
    status: "success",
    message: Object.keys(files).toString(),
  });
});

app.listen(5000, () => {
  console.log("server is start");
});
