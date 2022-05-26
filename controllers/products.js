const { CODE } = require('../constants/httpStatus');
const { MESSAGE } = require('../constants/messages');
const productsService = require('../services/products');

async function getAllProducts(_request, response) {
  const [products] = await productsService.getProducts();

  response.status(CODE.OK).json(products);
}

async function getProductById(request, response) {
  const { id } = request.params;
  
  const [[product]] = await productsService.getProducts(id);
  
  if (!product) return response.status(CODE.NOT_FOUND).json(MESSAGE.PRODUCT_NOT_FOUND);
  
  response.status(CODE.OK).json(product);
}

async function registerProduct(request, response) {
  const { body } = request;

  const registeredProduct = await productsService.registerProduct(...body);

  response.status(CODE.CREATED).json(registeredProduct);
}

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
};
