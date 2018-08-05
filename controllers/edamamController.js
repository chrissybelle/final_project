const path = require("path");
const router = require("express").Router();
const db = require("../models");

const edamamFunctions = {

// E D A M A M - R E L A T E D 
  // finds recipes from db where liked = true and origin = edamam
  findLikedEdamam: function (req, res) {
    db.Recipe
      .find({ 'liked': true, 'origin': 'Edamam' }
      // , { '_id': 0, 'description': 1 }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEdamam: function (req, res) {
    db.Recipe
      .find({ 'name': req.params.name })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeEdamam: function (req, res) {
    db.Recipe
      .findById({ 'name': req.params.name })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}

router.get("/api/recipes/search/edamam/liked", edamamFunctions.findLikedEdamam)

router.get("/api/recipes/search/edamam/:name", edamamFunctions.findByEdamam)

router.delete("/api/recipes/edamam/:name", edamamFunctions.removeEdamam)