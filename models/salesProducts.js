const database = require('../database');

async function registerSalesProducts(sale) {
  const { id, productId, quantity } = sale;

  const QUERY = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);';

  await database.execute(QUERY, [id, productId, quantity]);

  return { ...sale };
}

function updateSale(id, saleItems) {
  const [itemToUpdate] = saleItems;

  const { productId, quantity } = itemToUpdate;

  const UPDATE = 'UPDATE sales_products ';
  const SET = 'SET product_id = ?, quantity = ? ';
  const WHERE = 'WHERE sale_id = ? AND product_id = ?;';

  const QUERY = UPDATE + SET + WHERE;

  return database.execute(QUERY, [productId, quantity, id, productId]);
}

module.exports = {
  registerSalesProducts,
  updateSale,
};
