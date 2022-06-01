const productsService = require('../products');

function allSalesToCamelCase(sale) {
  const { sale_id: saleId, product_id: productId, quantity, date } = sale;

  const salesCamelCase = {
    saleId,
    date,
    productId,
    quantity,
  };

  return salesCamelCase;
}

function saleByIdToCamelCase(sale) {
  const { product_id: productId, quantity, date } = sale;

  const salesCamelCase = {
    date,
    productId,
    quantity,
  };

  return salesCamelCase;
}

async function updateQuantity({ productId, quantity }) {
  const [[product]] = await productsService.getProducts(productId);

  const newQuantity = product.quantity - quantity;

  const productUpdated = {
    name: product.name,
    quantity: newQuantity,
  };

  await productsService.updateProduct(productId, productUpdated);
}

module.exports = {
  allSalesToCamelCase,
  saleByIdToCamelCase,
  updateQuantity,
};
