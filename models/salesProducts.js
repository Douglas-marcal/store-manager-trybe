const database = require('../database');

async function registerSalesProducts(sale) {
  const { id, productId, quantity } = sale;

  const QUERY = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

  await database.execute(QUERY, [id, productId, quantity]);

  return { ...sale };
}

async function updateSale(saleItems) {
  const { id, productId, quantity } = saleItems;

  const QUERY = 'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?;';

  const { affectedRows } = await database.execute(QUERY, [productId, quantity, id]);

  return affectedRows;
}

module.exports = {
  registerSalesProducts,
  updateSale,
};
