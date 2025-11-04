const movieRoute = require("express").Router();
const { movieController } = require("../controllers");

movieRoute.get("/", movieController.getAllMovies);
movieRoute.get("/:id", movieController.getMovieById);

module.exports = movieRoute;
