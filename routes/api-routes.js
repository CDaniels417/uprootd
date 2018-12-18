// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/kava/", function(req, res) {
    console.log("this route is working");
    db.kavas.findAll({})
      .then(function(dbKava) {
        res.json(dbKava);
      });
  });

  

  // GET route for getting all of the posts
  app.get("/api/review/", function(req, res) {
    console.log("thsi route is working");
    db.reviews.findAll({})
      .then(function(dbReview) {
        res.json(dbReview);
      });
  });

  // GET route for getting a user and all related review info
  app.get("/api/user/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.reviews]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // GET route for getting a user and all related review info
  app.get("/api/kava/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.kavas.findOne({
      where: {
        id: req.params.id
      },
      include: [db.reviews]
    }).then(function(dbKava) {
      res.json(dbKava);
    });
  });

 // GET route for getting all of the users
 app.get("/api/user/", function(req, res) {
  console.log("thsi route is working");
  db.users.findAll({})
    .then(function(dbUsers) {
      res.json(dbUsers);
    });
});

  // POST route for saving a new review
  app.post("/api/review", function(req, res) {
    console.log(req.body);
    db.reviews.create(req.body)
      .then(function(dbReview) {
        res.json(dbReview);
      });
  });

  // POST route for saving a new user
  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.users.create(req.body)
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });


  // DELETE route for deleting Review
  app.delete("/api/review/:id", function(req, res) {
    db.reviews.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbReview) {
        res.json(dbReview);
      });
  });

  // PUT route for updating posts
  app.put("/api/review", function(req, res) {
    db.reviews.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbReview) {
        res.json(dbReview);
      });
  });
};
