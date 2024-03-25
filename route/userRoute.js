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
const { authenticateUser } = require("../middlewares/full-auth");

router
  .route("/getAllUser")
  .get(authenticateUser, authorziePermission("admin"), showAllUser);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").post(authenticatedUser, updateUser);
router.route("/updateUserPassword").post(authenticatedUser, updateUserPassword);
router.route("/:id").get(authenticateUser, showSingleUser);

module.exports = router;
