const express = require("express");
const app = express();
const mongoose = require("mongoose");
var parser = require("body-parser");
let { User } = require("./model");
var cors = require("cors");
mongoose.Promise = global.Promise;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect("mongodb://localhost:27017/taskii", {
  useNewUrlParser: true
});

app.get("/getData", function(req, res) {
  User.find()
    .then(data => {
      res.json(data);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({
        message: "Failed"
      });
    });
});

app.post("/postData", function(req, res) {
  let request = req.body;
  let user = new User(request);
  user
    .save()
    .then(function(user) {
      console.log(user);
      res.json({
        message: "Success"
      });
    })
    .catch(function(err) {
      res.status(500).json({
        message: "Failed"
      });
    });
});

app.put("/putData", function(req, res) {
  let input = req.body;
  console.log(input);
  User.findById(req.body.id)
    .then(function(userData) {
      userData.name = input.name;
      userData.save().then(function(userData) {
        res.json(userData);
      });
    })
    .catch(function(err) {
      res.send(err);
    });
});

app.delete("/removeData", function(req, res) {
  let input = req.body;
  console.log(input);
  User.findByIdAndDelete(req.body.id)
    .then(function(userData) {
      res.json("deleted");
    })
    .catch(function(err) {
      res.send(err);
    });
});
app.listen(3011);
