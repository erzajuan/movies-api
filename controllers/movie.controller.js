const { response, ApiError } = require("../helpers");

const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../services/movies/movie.service");

class movieController {
  static async getAllMovies(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await getAllMovies(page, limit);

      // Check Error
      if (!result.success) {
        return next(ApiError.internal(result.error));
      }

      // Check Data Kosong
      if (!result.data) {
        return next(ApiError.notFound(result.type, result.error));
      }

      return response.PAGINATED(
        res,
        "List of Movies",
        result.data,
        result.pagination
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await getMovieById(id);

      // Check Error
      if (!result.success) {
        return next(ApiError.internal(result.error));
      }

      // Check Data Kosong
      if (!result.data) {
        return next(ApiError.notFound(result.type, result.error));
      }

      return response.SUCCESS(res, "Movie details", result.data);
    } catch (error) {
      next(error);
    }
  }

  static async createMovie(req, res, next) {
    try {
      const result = await createMovie(req.body);

      if (!result.success) {
        return next(ApiError.internal(result.error));
      }

      return response.CREATED(res, "Movie created successfully", result.data);
    } catch (error) {
      next(error);
    }
  }

  static async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;

      const result = await updateMovie(id, data);

      // Check Error
      if (!result.success) {
        return next(ApiError.internal(result.error));
      }

      // Check Data Kosong
      if (!result.data) {
        return next(ApiError.notFound(result.type, result.error));
      }

      return response.SUCCESS(res, "Movie updated successfully", result.data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;

      const result = await deleteMovie(id);

      // Check Error
      if (!result.success) {
        return next(ApiError.internal(result.error));
      }

      // Check Data Kosong
      if (!result.data) {
        return next(ApiError.notFound(result.type, result.error));
      }

      return response.SUCCESS(res, "Movie deleted successfully", result.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = movieController;
