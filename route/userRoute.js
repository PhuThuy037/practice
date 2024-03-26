const {
  showAllUser,
  showCurrentUser,
  showSingleUser,
  updateUser,
  updateUserPassword,
} = require("../controller/userController");

const express = require("express");
const router = express.Router();
const {
  authenticatedUser,
  authorziePermission,
} = require("../middlewares/authentication");
// const {
//   authenticatedUser,
//   authorziePermission,
// } = require("../middlewares/full-auth");

router
  .route("/getAllUser")
  .get(authenticatedUser, authorziePermission("admin"), showAllUser);

router.route("/showMe").get(authenticatedUser, showCurrentUser);
router.route("/updateUser").patch(authenticatedUser, updateUser);
router
  .route("/updateUserPassword")
  .patch(authenticatedUser, updateUserPassword);
router.route("/:id").get(authenticatedUser, showSingleUser);

module.exports = router;
