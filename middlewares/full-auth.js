const CustomError = require("../errors");
const { verifyToken } = require("../utils");
const authenticatedUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }

  try {
    // console.log(verifyToken(token));
    console.log(token);
    const { name, userId, role } = verifyToken(token);
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.Unauthenticated("Authentication Invalid");
  }
};
const authorziePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};
module.exports = { authenticatedUser, authorziePermission };
