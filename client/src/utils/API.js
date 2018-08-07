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
    return axios.get("/api/recipes/search/" + user, { params: { searchQuery: queryString } });
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
    return axios.get("https://api.edamam.com/search?q=" + queryString + "&app_id=a5ee7877&app_key=385a3e92adcbf250abaab079e4e705f5&to=12");
  },
  // Saves Edamam API recipes to our db
  // See "savedEdamam" in edmamamController
  saveEdamam: function (recipeData) {
    return axios.post("/api/recipes/edamam/", recipeData);
  },
  // Searches our db for liked recipes from Edamam db - used for "View Saved Recipes"
  // see "findLikedEdamam" in edamamController
  searchForLiked: function (user) {
    return axios.get("/api/recipes/edamam/liked", { params: { loggedUser: user } })
  },
  // Used to search our db to see if clicked recipe has already been saved
  // see "findOneEdamam" in edamamController
  findOneEdamam(name, user) {
    return axios.get("/api/recipes/edamam/search/" + name, { params: { loggedUser: user } })
  },
  // Deletes saved Edamam recipe from our db
  // see "removeEdamam" in edamamController
  deleteEdamam: function (cardName) {
    return axios.delete("/api/recipes/edamam/" + cardName);
  },
  deleteEdamamID: function (id) {
    return axios.delete("/api/recipes/edamam/user/remove/" + id);
  },
  // Searches our db for previously saved Edamam recipes -***** need to add user
  // see "findByUser" in edamamController
  findEdamamUser: function (user) {
    // console.log(cardLink);
    return axios.get("/api/recipes/edamam/user/" + user);
    // console.log({params:{searchQuery:cardLink}});
  }
};
