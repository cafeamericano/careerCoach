//DEPENDENCIES================================================================

const express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require("path");
var app = express();

var PORT = process.env.PORT || 4000;

//DATABASE SETUP WITH MONGOOSE================================================================

//Import DB models
var db = require("./models");

//Connect to database
var dbURL = process.env.MONGODB_URI || "mongodb://localhost/careercoachdb";
mongoose.connect(dbURL, {
  useNewUrlParser: true
});

//EXPRESS PUBLIC FOLDER================================================================

app.use(express.static(__dirname + "/public"));

//BODY PARSER MIDDLEWARE================================================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES================================================================

app.get("/all", (req, res) => {
  db.JobApplication.find({})
    .sort({ applicationDate: -1 })
    .then(function(queryResult) {
      console.log(queryResult);
      res.json(queryResult);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/add", (req, res) => {
  console.log(req.body);
  db.JobApplication.create(req.body)
    .then(function() {
      res.send("Record added");
    })
    .catch(function(err) {
      res.json(err);
    });
});

// app.use(require("./controllers/dataPullRoutes.js"));
// app.use(require("./controllers/dataPushRoutes.js"));
// app.use(require("./controllers/adminRoutes.js"));
// app.use(require("./controllers/accountRoutes.js"));

//START SERVER================================================================

// let Relias = {
//   companyName: "Relias",
//   jobTitle: "Junior Frontend Developer",
//   applicationDate: "2019-07-20",
//   firstResponseDate: "2019-08-20",
//   isMajorCorporation: false,
//   progress: "Outstanding 1 or More Weeks",
//   closure: "Denied",
//   comments: ""
// };

// db.JobApplication.create(Relias);

app.listen(PORT, function() {
  console.log(`Server listening on Port ${PORT}...`);
});
