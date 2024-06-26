const express = require("express");
const router = express.Router();
const { login, logout, register } = require("../controller/authUserController");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

module.exports = router;
