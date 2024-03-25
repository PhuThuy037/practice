const checkPermission = (reqUser, resoruceId) => {
  if (reqUser.role === "admin") return;
  if (reqUser.useId === resoruceId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};
module.exports = checkPermission