const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (email, password) => {
  try {
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
      return { success: false, error: "Email not found" };
    }

    const match = bcrypt.compare(password, checkEmail.password);
    if (!match) {
      return { success: false, code: 401, error: "Invalid password" };
    }

    const token = jwt.sign(checkEmail.toJSON(), process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return { success: true, data: token };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const registerUser = async (name, email, password) => {
  try {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return { success: false, error: "Email already registered" };
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  loginUser,
  registerUser,
};
