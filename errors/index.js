const CustomError = require("./CustomEror");
const BadRequest = require("./BadRequest");
const NotFound = require("./Not-found");
const Unauthenticated = require("./unauthenticated");
const Unauthozied = require("./unauthoried");

module.exports = {
  CustomError,
  BadRequest,
  NotFound,
  Unauthenticated,
  Unauthozied,
};
