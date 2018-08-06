const path = require("path");
const router = require("express").Router();
const db = require("../models");

const edamamFunctions = {

// E D A M A M - R E L A T E D 
  //saves recipes to db
  create: function (req, res) {
      db.Edamam
      .create(req.body)
      .then(console.log("controller hit"))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // finds recipes saved by user
  findLikedEdamam: function (req, res) {
    db.Edamam
      .find({ 'user': 'test' })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEdamam: function (req, res) {
    db.Edamam
      .find({ 'user': 'test', 'name': req.params.name })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeEdamam: function (req, res) {
    db.Edamam
      .findById({ 'name': req.params.name })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}


router.post("/api/edamam", edamamFunctions.create)

router.get("/api/edamam/liked", edamamFunctions.findLikedEdamam)

router.get("/api/edamam/search/:name", edamamFunctions.findByEdamam)

router.delete("/api/edamam/:name", edamamFunctions.removeEdamam)

// If no API routes are hit, send the React app
router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  
  module.exports = router;
  