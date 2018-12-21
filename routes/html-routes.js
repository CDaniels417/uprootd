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
    db.kavas.findAll({
      include: [{
        model: db.reviews,
        nested: true
      }]
    }).then(function(dbKava){

      var avg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
      var ratingArr = [];


      for (var i = 0; i < dbKava.length; i++) {
        var a = [];
        dbKava[i].reviews.forEach(function(obj){
          a.push(obj.rating);
        });
        dbKava[i].rating = avg(a);

        if(dbKava[i].rating > 4){
          dbKava[i].isTrending = true;
        } else{
          dbKava[i].isTrending = false;
        }
      }

      var obj = {
        kavas: dbKava,
        isMainPage: true
      };

      res.render('index',obj);
    });
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

      if(obj.kava.rating > 4){
        obj.kava.isTrending = true;
      } else{
        obj.kava.isTrending = false;
      }

      res.render('kava', obj);
    });
  });

  app.get("/user/:username", function(req, res) {
    db.users.findOne({
      where: {
        username: req.params.username
      },
      include: {
        model: db.reviews,
        all: true,
        nested: true
      }
    }).then(function(dbUser) {

      var obj = {
        user:{
          name: dbUser.name,
          location: dbUser.location,
          reviews: dbUser.reviews
        }
      };

      res.render('users', obj);
    });
  });

  app.get('/login', function(req, res){
    res.render('login',{});
  });

};
