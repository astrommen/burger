// import express
var express = require("express");
// import model (burger.js) to use db functions
var burger = require("../models/burger.js");

var router = express.Router();

// created the routes and set logic 
router.get("/", function(req, res){
  burger.all(function(data) {
    var allBurgers = {
      burgers: data
    };
    console.log("this is allBurgers: " + allBurgers);
    res.render("index", allBurgers);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log(req);
  burger.create(
    [
      "burger_name", "devoured"
    ], 
    [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      res.json({ id: result.insertID });
    }
  );
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body);

  burger.update({
   devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// export routes for server.js
module.exports = router;