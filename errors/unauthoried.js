const CustomError = require("./CustomEror");
const { StatusCodes } = require("http-status-codes");

class Unauthorzied extends CustomError {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorzied;
