const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequest("please provide infomation");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.NotFound("Cant find your email account");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new CustomError.Unauthenticated("Not valid");
  }

  res.status(StatusCodes.OK).json({ user });
};
const logout = async (req, res) => {
  res.send("logout");
};
const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    throw new CustomError.BadRequest("Please provide your information");
  }
  const checkEmailExist = await User.findOne({ email });
  if (checkEmailExist) {
    throw new CustomError.BadRequest("Email is ready exist");
  }
  // check first account and add role admin
  const isFirstAccuont = (await User.countDocuments({})) === 0;
  const role = isFirstAccuont ? "admin" : "user";
  const user = await User.create({ email, name, password, role });
  res.status(StatusCodes.CREATED).json({ user });
};
module.exports = { login, logout, register };
