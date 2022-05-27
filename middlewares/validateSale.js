const { MIN_QUANTITY } = require('../constants');
const { MESSAGE } = require('../constants/messages');

function validateSale(request, _response, next) {
  const { body } = request;

  const productId = body.every((product) => (
    Object.prototype.hasOwnProperty.call(product, 'productId')
  ));

  const quantity = body.every((product) => (
    Object.prototype.hasOwnProperty.call(product, 'quantity')
  ));

  const invalidQuantity = body.some((product) => (
    product.quantity < MIN_QUANTITY
  ));

  if (!productId) throw MESSAGE.PRODUCT_ID_REQUIRED;

  if (!quantity) throw MESSAGE.QUANTITY_REQUIRED;

  if (invalidQuantity) throw MESSAGE.LOW_QUANTITY;

  next();
}

module.exports = validateSale;
