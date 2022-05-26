const { CODE } = require('./httpStatus');

const MESSAGE = {
  SALE_NOT_FOUND: {
    status: CODE.NOT_FOUND,
    message: 'Sale not found',
  },
  PRODUCT_NOT_FOUND: {
    status: CODE.NOT_FOUND,
    message: 'Product not found', 
  },
  NAME_REQUIRED: {
    status: CODE.BAD_REQUEST,
    message: '"name" is required',
  },
  QUANTITY_REQUIRED: {
    status: CODE.BAD_REQUEST,
    message: '"quantity" is required',
  },
  NAME_TOO_SHORT: {
    status: CODE.UNPROCESSABLE_ENTITY,
    message: '"name" length must be at least 5 characters long',
  },
  LOW_QUANTITY: {
    status: CODE.UNPROCESSABLE_ENTITY,
    message: '"quantity" must be greater than or equal to 1',
  },
};

module.exports = { MESSAGE };
