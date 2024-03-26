const { verifyToken } = require("../utils");
const CustomError = require("../errors");

const { model } = require("mongoose");
const authenticatedUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.Unauthenticated("Authenticated invalid");
  }
  try {
    const { name, userId, role } = verifyToken(token);
    console.log(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.Unauthenticated("Authenticated invalid");
  }
};
const authorziePermission = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      throw new CustomError.Unauthozied("Unauthorized to access this route");
    }
    next();
  };
};
module.exports = { authenticatedUser, authorziePermission };
