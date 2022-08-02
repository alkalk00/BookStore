const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const web = require("./routes/requests");
var cookieParser = require('cookie-parser')

//databse connection
require("./db/conn");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

//main page
app.set("view engine", "ejs");
app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running at port 5000");
});

app.use(web);
