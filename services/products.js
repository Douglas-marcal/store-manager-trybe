const productsModel = require('../models/products');

function getProducts(id = null) {
  if (id) return productsModel.getProductById(id);

  return productsModel.getAllProducts();
}

async function registerProduct(product) {
  const { name, quantity } = product;

  const [products] = await productsModel.getAllProducts();
  const productAlreadyExists = products.some((productDatabase) => name === productDatabase.name);

  if (productAlreadyExists) return null;

  const { id } = await productsModel.registerProduct(product);

  const newProduct = { id, name, quantity };

  return newProduct;
}

function updateProduct(id, product) {
  return productsModel.updateProduct(id, product);
}

function deleteProduct(id) {
  return productsModel.deleteProduct(id);
}

module.exports = {
  getProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
};
