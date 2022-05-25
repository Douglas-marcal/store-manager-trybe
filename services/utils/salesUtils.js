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

module.exports = {
  allSalesToCamelCase,
  saleByIdToCamelCase,
};
