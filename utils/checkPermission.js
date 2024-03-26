const CustomError = require("../errors");
const checkPermission = (reqUser, resoruceId) => {
  if (reqUser.role === "admin") return;
  if (reqUser === resoruceId.toString()) return;
  throw new CustomError.Unauthozied("Not authorized to access this route");
};
module.exports = checkPermission;
