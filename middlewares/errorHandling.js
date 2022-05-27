const { CODE } = require('../constants/httpStatus');

function errorHandling(error, _request, response, _next) {
  const message = { message: error.message };
  console.log(error);

  response
    .status(error.status || CODE.INTERNAL_SERVER_ERROR)
    .json(message);
}

module.exports = errorHandling;
