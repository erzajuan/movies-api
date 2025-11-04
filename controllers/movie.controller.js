const { response, ApiError } = require("../helpers");

const {
  getAllMovies,
  getMovieById,
} = require("../services/recipes/movie.service");

class movieController {
  static async getAllMovies(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await getAllMovies(page, limit);
      if (!result.success) {
        if (result.type == "Not Found") {
          return next(ApiError.notFound(result.type, result.error));
        } else {
          return next(ApiError.internal(result.error));
        }
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
      if (!result.success) {
        return next(ApiError.notFound("Movie Not Found", result.error));
      }

      return response.SUCCESS(res, "Movie details", result.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = movieController;
