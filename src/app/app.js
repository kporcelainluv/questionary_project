const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

app.get("/", function(req, res) {
  res.render("form");
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.post("/", function(req, res) {
  console.log(req.body);
  res.send("received your request!");
});
app.listen(3000);
