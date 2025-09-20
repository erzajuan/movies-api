const route = require("express").Router();

const recipeRoute = require("./recipe.route");

route.use("/recipes", recipeRoute);

module.exports = route;