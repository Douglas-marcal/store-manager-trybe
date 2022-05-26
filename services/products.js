const { MESSAGE } = require('../constants/messages');
const productsModel = require('../models/products');

function getProducts(id = null) {
  if (id) return productsModel.getProductById(id);

  return productsModel.getAllProducts();
}

async function registerProduct(product) {
  const { name, quantity } = product;

  const [products] = await productsModel.getAllProducts();
  const alreadyExistsProduct = products.some((productDatabase) => name === productDatabase.name);

  if (alreadyExistsProduct) throw MESSAGE.ALREADY_EXISTS;

  const { id } = await productsModel.registerProduct(product);

  const newProduct = { id, name, quantity };

  return newProduct;
}

module.exports = {
  getProducts,
  registerProduct,
};
