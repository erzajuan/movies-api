const { Movie } = require("../../models");

const getAllMovies = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const total = await Movie.countDocuments();
    // Fetch movies with pagination
    const movies = await Movie.find().skip(skip).limit(limit);

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

    return { success: true, data: movie };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const createMovie = async (dataMovie) => {
  try {
    const newMovie = new Movie(dataMovie);
    await newMovie.save();

    return { success: true, data: newMovie };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const updateMovie = async (id, data) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return { success: true, data: updatedMovie };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    return { success: true, data: deletedMovie };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
