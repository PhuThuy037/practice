const CustomError = require("./CustomEror");
const { StatusCodes } = require("http-status-codes");
class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_GATEWAY;
  }
}
module.exports = BadRequest;
