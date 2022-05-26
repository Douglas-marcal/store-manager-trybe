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
};

module.exports = { MESSAGE };
