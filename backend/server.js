const express = require("express");
const { response } = require("express");
const app = express();
require("dotenv").config();
const pool = require("./db");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const bodyparser = require("body-parser");
const mariadb = require("mariadb");

var corsOptions = {
  origin: [
    "http://localhost:4200",
    "http://localhost:4000",
    "http://192.168.1.12:4200",
  ],
};
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
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
app.use(bodyparser.json());
require("./upload.js")(app);

app.listen(8000, () => {
  console.log("App is listening at port 8000");
});

app.get("/", async function (req, res) {
  console.log("something works");
  //res.send("hello world");
  let conn;
  try {
    // establish a connection to MariaDB
    conn = await pool.getConnection();
    //addquery =
    ('insert into student_details values("16CS028","Random Raj","2016-2020",0,"randomraj4423@gmail.com","Computer Science and Engineering")');
    // create a new query
    var query = "select * from student_details";
    //conn.query(addquery);
    // execute the query and set the result to a new variable
    var rows = await conn.query(query);

    // return the results
    res.send(rows);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//console.log(randomfile);
app.get("/fetchdetails/:id", async function (req, res) {
  console.log("docs works");
  var id = req.params.id;
  console.log(id);

  //res.send(randomfile);
  let conn;
  try {
    // establish a connection to MariaDB
    conn = await pool.getConnection();
    // addquery =
    //   'insert into student_details values("16CS028","Random Raj","2016-2020",0,"randomraj4423@gmail.com","Computer Science and Engineering")';
    // create a new query
    var query =
      'select * from requests where req_to = "' + id + '" and Status = 0';
    //conn.query(addquery);
    // execute the query and set the result to a new variable
    var rows = await conn.query(query);
    if (rows.length < 1) {
      console.log("zero");
    }
    console.log(rows);
    // var namequery='select Name from student_details where '

    // return the results
    res.send(rows);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.post("/addrequest", async function (req, res) {
  // console.log(params);
  console.log(req.body);
  console.log("new request recieved");
  var faculty_number = "";
  let conn;
  try {
    // establish a connection to MariaDB

    conn = await pool.getConnection();
    getFacultyQuery =
      'select AdvisorCode from student_details where MuthootID = "' +
      req.body.muthootID.trim() +
      '"';
    console.log(getFacultyQuery);
    faculty_number = await conn.query(getFacultyQuery);
    console.log("fcode", faculty_number[0].AdvisorCode);
    addquery = `insert into requests values("${req.body.muthootID.trim()}","${faculty_number[0].AdvisorCode.trim()}","${req.body.category.trim()}","${req.body.specification.trim()}","${req.body.level.trim()}","${req.body.prize.trim()}","${req.body.role.trim()}","${req.body.filename.trim()}",NOW(),0)`;
    // create a new query
    //var query = "select * from student_details";
    await conn.query(addquery);
    // execute the query and set the result to a new variable
    //var rows = await conn.query(query);

    // return the results
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

app.get("/login", async function (req, res) {
  console.log("in login", req.query);
  //res.send("hello world");
  let conn;
  try {
    // establish a connection to MariaDB
    conn = await pool.getConnection();
    addquery =
      'insert into student_details values("16CS028","Random Raj","2016-2020",0,"randomraj4423@gmail.com","Computer Science and Engineering")';
    // create a new query
    var query =
      'select * from faculty_details where MuthootID = "' +
      req.query.facultyID +
      '" and Password = "' +
      req.query.password +
      '"';
    //conn.query(addquery);
    // execute the query and set the result to a new variable
    var rows = await conn.query(query);
    //console.log(rows);
    // if (rows.length < 1) {
    //   res.send("fail");
    // } else {
    //   res.send("success");
    // }

    // return the results
    console.log(rows, rows.length);
    res.send(rows);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});
