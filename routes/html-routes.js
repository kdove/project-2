// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {

  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/loginsignup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/loginsignup.html"));
  });

  app.get("/home", (req,res) => {
    res.render("index", { home: true });
  });


  app.get("/library", (req,res) => {
    hbrsResponse = [];
    db.Barcode.findAll({
      where: {
        Active: true
      }
    }).then(response => {
      response.forEach((item => hbrsResponse.push(item.dataValues)));
      console.log("DBResponse", response);
      console.log("hbrsResponse", hbrsResponse);
      res.render("index", {
        barcode: hbrsResponse,
        library: true,
      });
    });
  });

  app.get("/library-new", (req,res) => {
    hbrsResponse = [];
    db.Barcode.findAll({
      where: {
        Active: false
      }
    }).then(response => {
      response.forEach((item => hbrsResponse.push(item.dataValues)));
      console.log("DBResponse", response);
      console.log("hbrsResponse", hbrsResponse);
      res.render("index", {
        barcode: hbrsResponse,
        libraryNew: true,
      });
    });
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
