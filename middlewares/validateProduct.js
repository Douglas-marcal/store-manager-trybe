const { MIN_CHARACTERS, MIN_QUANTITY } = require('../constants');
const { MESSAGE } = require('../constants/messages');

function validateProduct(request, _response, next) {
  const { name, quantity } = request.body;

  if (!name) throw MESSAGE.NAME_REQUIRED;

  if (name.length < MIN_CHARACTERS) throw MESSAGE.NAME_TOO_SHORT;

  if (quantity === undefined) throw MESSAGE.QUANTITY_REQUIRED;

  if (quantity < MIN_QUANTITY) throw MESSAGE.LOW_QUANTITY;

  next();
}

module.exports = validateProduct;
