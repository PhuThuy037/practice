const CustomError = require("../errors");
const { verifyToken } = require("../utils");
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }

  try {
    const { name, userId, role } = verifyToken(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }
};
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizeRoles };
