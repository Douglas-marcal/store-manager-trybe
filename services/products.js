const productsModel = require('../models/products');

function getAllProducts() {
  return productsModel.getAllProducts();
}

function getProductById() {
  return productsModel.getProductById();
}

module.exports = {
  getAllProducts,
  getProductById,
};
