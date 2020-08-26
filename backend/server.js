const express = require("express");
const { response } = require("express");
const app = express();
require("dotenv").config();
const pool = require("./db");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const mariadb = require("mariadb");

var corsOptions = {
  origin: [
    "http://localhost:4200",
    "http://localhost:4000",
    "http://192.168.1.2:4200",
  ],
};
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://192.168.1.2:4200");
  //res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors(corsOptions));

require("./upload.js")(app);

app.listen(8000, () => {
  console.log("App is listening at port 8000");
});

app.get("/", function (req, res) {
  res.send("hello world");
});

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// //will be using this for uplading
// const upload = multer({ storage: storage });

// app.post("/testUpload", upload.single("file"), function (req, res) {
//   debug(req.file);
//   console.log("storage location is ", req.hostname + "/" + req.file.path);
//   return res.send(req.file);
// });
