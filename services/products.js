const productsModel = require('../models/products');

function getProducts(id = null) {
  if (id) return productsModel.getProductById(id);

  return productsModel.getAllProducts();
}

module.exports = {
  getProducts,
};
