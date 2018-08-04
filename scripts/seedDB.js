const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist",
  {
    useMongoClient: true
  }
);

const recipeSeed = [
  {
    name: "Ultimate Chocolate Chip Cookies",
    ingridients: ["3/4 cup granulated sugar",
    "3/4 cup packed brown sugar",
    "1 cup butter or margarine, softened",
    "1 teaspoon vanilla", 
    "1 egg",
    "2 1/4 cups Gold Medal™ all-purpose flour",
    "1 teaspoon baking soda",
    "1/2 teaspoon salt",
    "1 cup coarsely chopped nuts",
    "1 package (12 ounces) semisweet chocolate chips (2 cups)"],
    description: "Heat oven to 375ºF. Mix sugars, butter, vanilla and egg in large bowl. Stir in flour, baking soda and salt (dough will be stiff). Stir in nuts and chocolate chips. Drop dough by rounded tablespoonfuls about 2 inches apart onto ungreased cookie sheet. Bake 8 to 10 minutes or until light brown (centers will be soft). Cool slightly; remove from cookie sheet. Cool on wire rack.",
    sharable: true,
    origin: "https://www.bettycrocker.com/recipes/ultimate-chocolate-chip-cookies/77c14e03-d8b0-4844-846d-f19304f61c57"
  }
];

db.Recipe
  .remove({})
  .then(() => db.Recipe.collection.insertMany(recipeSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
