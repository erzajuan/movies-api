const { response, ApiError } = require("../helpers");

const { loginUser, registerUser } = require("../services/users/user.service");

class userController {
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);

      // Check Error
      if (!result.success) {
        if (result.code === 401) {
          return next(ApiError.unauthorized(result.error));
        } else {
          return next(ApiError.internal(result.error));
        }
      }

      return response.SUCCESS(res, "Login successful", { token: result.data });
    } catch (error) {
      next(error);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const result = await registerUser(name, email, password);

      if (!result.success) {
        return next(ApiError.badRequest(result.error));
      }

      return response.CREATED(res, "User registered successfully", result.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
