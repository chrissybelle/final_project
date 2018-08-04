var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userSchema = new Schema({
  // `name` must be unique and of type String
  name: {
    type: String,
    unique: true
  },
  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes
recipes: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Recipe model
      ref: "Recipe"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
var user = mongoose.model("user", userSchema);

// Export the User model
module.exports = user;