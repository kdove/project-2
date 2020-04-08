// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const html = require("./html-routes");

let GSM = 12356;

module.exports = (app) => {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/signup", (req, res) => {
    GSM += 6;
    const { email, password, company } = req.body;
    console.log(email);
    console.log(password);
    const promises = [
      db.Company.create({
        Gs1Prefix: GSM,
        CompanyName: company
      }).then((data) => {
        return db.User.create({
          Email: email,
          Password: password,
          CompanyId: data.dataValues.id
        });
      })
    ];
    return Promise.all(promises).then((resp, err) => {
      if (err) {
        return res.status(500).json(err);
      }

      db.Company.findAll({
        include: [{
          model: db.User
        }]
      }).then(response => {
        console.log(response[0].dataValues);
        res.json(response[0].dataValues);
      });
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    db.User.findOne({
      include: [
        { model: db.Company }
      ],
      where: {
        Email: req.body.email
      }
    })
      .then((response) => {
        res.json(response);
        // res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    console.log(req);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
