import axios from "axios";

export default {
  // Gets all recipes
  getRecipes: function () {
    return axios.get("/api/recipes");
  },
  //Get recipe from user
  getRecipesUser: function (user) {
    return axios.get("/api/recipes/user/" + user);
  },
   //Search recipes from user by keyword 

   getRecipesUserQuery: function (user, queryString) {
    return axios.get("/api/recipes/search/" + user, {params:{searchQuery:queryString}});

  },
  // Deletes the recipe with the given id
  deleteRecipes: function (id) {
    return axios.delete("/api/recipes/" + id);
  },
  // Saves a recipe to the database
  saveRecipes: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  // Gets the recipe with the given id
  getRecipesID: function (id) {
    return axios.get("/api/recipes/" + id);
  },
  patchRecipes: function (id, recipeData) {
    return axios.patch("/api/recipes/" + id, recipeData);
  },

  // E D A M A M - R E L A T E D  Q U E R I E S
  // Searches Edamam API
  searchEdamam: function (queryString) {
    return axios.get("https://api.edamam.com/search?q=" + queryString + "&app_id=a5ee7877&app_key=385a3e92adcbf250abaab079e4e705f5");
  },
  // Searches our db for liked recipes from Edamam db
  // (see "findLikedEdamam" in recipesController)
  searchForLiked: function () {
    return axios.get("/api/recipes/search/edamam/liked")
  },
  // Saves Edamam API recipes to our db
  saveEdamam: function (recipeData) {
    return axios.post("/api/recipes", recipeData);
  },
  // Searches our db for previously saved Edamam recipes -***** need to add user
  findEdamamID: function (cardName) {
    // console.log(cardLink);
    return axios.get("/api/recipes/search/edamam/" + cardName);
    // console.log({params:{searchQuery:cardLink}});
  },
  // Deletes saved Edamam recipe from our db
  deleteEdamam: function (id) {
    return axios.delete("/api/recipes/edamam/" + id);
  }
};
