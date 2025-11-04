const Movie = require("../../models/movie.model");

const getAllMovies = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Movie.countDocuments();
    // Fetch movies with pagination
    const movies = await Movie.find().skip(skip).limit(limit);

    if (!movies) {
      return { success: false, type: "Not Found", error: "No movies found" };
    }

    return {
      success: true,
      data: movies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return { success: false, type: "Not Found", error: "Movie not found" };
    }

    return { success: true, data: movie };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
};
