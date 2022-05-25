const productsModel = require('../models/products');

function getAllProducts() {
  return productsModel.getAllProducts();
}

function getProductById(id) {
  return productsModel.getProductById(id);
}

module.exports = {
  getAllProducts,
  getProductById,
};
