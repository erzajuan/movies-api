const route = require("express").Router();

const movieRoute = require("./movie.route");
const userRoute = require("./user.route");

route.use("/movies", movieRoute);
route.use("/users", userRoute);

module.exports = route;
