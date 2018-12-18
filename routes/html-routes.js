// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route
  app.get("/", function(req, res) {
    res.render('index',{});
  });

  // kava route
  app.get("/kava", function(req, res) {
    db.kavas.findOne({
      where: {
        id: req.query.id
      },
      include: [db.reviews]
    }).then(function(dbKava) {
      var avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
      var ratingArr = [];

      for (var i = 0; i < dbKava.reviews.length; i++) {
        ratingArr.push(dbKava.reviews[i].rating);
      };

      var obj = {
        kava:{
          name: dbKava.name,
          country: dbKava.country,
          description: dbKava.description,
          rating: avg(ratingArr)
        }
      };

      res.render('kava', obj);
    });
  });

  app.get("/user/:username", function(req, res) {
    db.users.findOne({
      where: {
        username: req.params.username
      },
      include: [db.reviews]
    }).then(function(user) {

      var obj = {
        user:{
          name: user.name,
          location: user.location,
          reviews: user.reviews
        }
      };

      res.render('users', obj);
    });
  });

  // app.get("/cms", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

};
