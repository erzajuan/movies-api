const movieRoute = require("express").Router();
const { movieController } = require("../controllers");

// Fetch Movie
movieRoute.get("/", movieController.getAllMovies);
movieRoute.get("/:id", movieController.getMovieById);

// Create Movie
movieRoute.post("/", movieController.createMovie);

// Update Movie
movieRoute.put("/:id", movieController.updateMovie);

// Delete Movie
movieRoute.delete("/:id", movieController.deleteMovie);

module.exports = movieRoute;
