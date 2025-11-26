const userRoute = require("express").Router();
const { userController } = require("../controllers");

// Login User
userRoute.post("/login", userController.loginUser);

// Register User
userRoute.post("/register", userController.registerUser);

module.exports = userRoute;
