const mongoose = require("mongoose");
//Save a reference to the Schema constructor
const Schema = mongoose.Schema;

//Using the Schema constructor, create a new NoteSchema object
const edamamSchema = new Schema({
  user: {type: String, required: true, },
  name: { type: String, required: true, text: true },
  ingredients: { type: Array, required: true, text: true },
  recipelink: { type: Array, required: true, text: true },
  image: {type: String },
  liked: { type: Boolean, required: true, default: false }
});

const Edamam = mongoose.model("Edamam", edamamSchema);

module.exports = Edamam;
