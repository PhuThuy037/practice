const CustomError = require("../errors");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { checkPermission, createTokenUser, createCokie } = require("../utils");

const showAllUser = async (req, res) => {
  const user = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ user });
};
const showSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    throw new CustomError.NotFound(`No user with id  ${req.params.userId}`);
  }
  checkPermission(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};
const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError.BadRequest("Please provide user");
  }
  const user = await User.findOne({ _id: req.user.userId });
  console.log(user);
  user.email = email;
  user.name = name;
  await user.save();
  const tokenUser = createTokenUser(user);

  createCokie(res, tokenUser);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequest("Please provide password");
  }
  const user = await User.findOne({ _id: req.user.userId });
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};

module.exports = {
  showAllUser,
  showCurrentUser,
  showSingleUser,
  updateUser,
  updateUserPassword,
};
