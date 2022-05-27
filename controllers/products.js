const { CODE } = require('../constants/httpStatus');
const { MESSAGE, MESSAGE_NOT_FOUND } = require('../constants/messages');
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

  const registeredProduct = await productsService.registerProduct(body);

  if (!registeredProduct) return response.status(CODE.CONFLICT).json(MESSAGE.ALREADY_EXISTS);

  response.status(CODE.CREATED).json(registeredProduct);
}

async function updateProduct(request, response) {
  const { body, params: { id } } = request;

  const productUpdated = await productsService.updateProduct(id, body);

  if (!productUpdated) return response.status(CODE.NOT_FOUND).json(MESSAGE_NOT_FOUND);
  
  const { name, quantity } = body;

  const message = { id, name, quantity };

  response.status(CODE.OK).json(message);
}

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
};
