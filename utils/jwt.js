const jwt = require("jsonwebtoken");
const { model } = require("mongoose");

const creatJwt = (payload) =>
  jwt.sign(payload, process.env.SECRET, {
    expiresIn: "30d",
  });

const verifyToken = (token) => jwt.verify(token, process.env.SECRET);

const createCokie = (res, user) => {
  const token = creatJwt(user);

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    signed: true,
  });
};

module.exports = { creatJwt, verifyToken, createCokie };
