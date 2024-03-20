const CustomError = require("./CustomEror");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = Unauthenticated;
