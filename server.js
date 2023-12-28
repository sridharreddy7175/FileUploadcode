require("dotenv").config();
var express = require("express");
const mongoose = require("mongoose");
var app = express();
const fileUpload = require("express-fileupload");
const Product = require("./models/product");
const Aws = require("aws-sdk");

app.use(fileUpload());

console.log("=======>", process.env.DATABASE);

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

app.get("/", (req, res) => {
  res.status(200).send("welocome to the node js");
});

// s3 config
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function uploadFile(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `fileupload/scanskill-${Date.now()}-${file.name}`,
    Body: file.data,
    ACL: "public-read",
  };
  const data = await s3.upload(params).promise();
  return data.Location;
}

app.post("/upload", async (req, res) => {
  const fileLocation = await uploadFile(req.files.file);
  const product = new Product({
    name: req.body.name,
    productImage: data.Location,
  });
  product
    .save()
    .then((result) => {
      res.status(200).send({
        _id: result._id,
        name: result.name,
        productImage: fileLocation,
      });
    })
    .catch((err) => {
      res.send({ message: err });
    });
});

app.listen(5000, () => {
  console.log("server is start");
});
