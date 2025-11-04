const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    plot: String,
    genres: [String],
    runtime: Number,
    cast: [String],
    poster: String,
    fullplot: String,
    languages: [String],
    released: Date,
    directors: [String],
    rated: String,
    awards: {
      wins: Number,
      nominations: Number,
      text: String,
    },
    year: Number,
    imdb: {
      rating: Number,
      votes: Number,
      id: Number,
    },
    countries: [String],
    type: String,
  },
  {
    collection: "movies", // biar mongoose langsung pakai collection sample_mflix.movies
  }
);

module.exports = mongoose.model("Movie", movieSchema);