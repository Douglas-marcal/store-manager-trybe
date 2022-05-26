const { CODE } = require('../constants/httpStatus');
const { MESSAGE } = require('../constants/messages');
const { getProducts } = require('../services/products');

async function getAllProducts(_request, response) {
  const [products] = await getProducts();

  response.status(CODE.OK).json(products);
}

async function getProductById(request, response) {
  const { id } = request.params;
  
  const [[product]] = await getProducts(id);
  
  if (!product) return response.status(CODE.NOT_FOUND).json(MESSAGE.PRODUCT_NOT_FOUND);
  
  response.status(CODE.OK).json(product);
}

module.exports = {
  getAllProducts,
  getProductById,
};
