const { STATUS_CODE } = require('../constants/httpStatus');

function errorHandling(error, _request, response, _next) {
  const message = { message: error.message };

  response
    .status(error.status || STATUS_CODE.INTERNAL_SERVER_ERROR)
    .json(message);
}

module.exports = { errorHandling };
