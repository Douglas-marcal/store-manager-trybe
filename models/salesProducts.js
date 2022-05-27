const database = require('../database');

async function registerSalesProducts(sale) {
  const { id, productId, quantity } = sale;

  const QUERY = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

  await database.execute(QUERY, [id, productId, quantity]);

  return {
    id,
    productId,
    quantity,
  };
}

module.exports = {
  registerSalesProducts,
};
