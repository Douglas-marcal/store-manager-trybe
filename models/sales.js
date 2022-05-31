const database = require('../database');

function getAllSales() {
  const SELECT = 'SELECT sale_id, sales.`date`, product_id, quantity FROM sales_products ';
  const INNER_JOIN = 'INNER JOIN sales ON sales_products.sale_id = sales.id;';

  const QUERY = SELECT + INNER_JOIN;

  return database.execute(QUERY);
}

function getSaleById(id) {
  const SELECT = 'SELECT sales.`date`, product_id, quantity FROM sales_products ';
  const INNER_JOIN = 'INNER JOIN sales ON sales_products.sale_id = sales.id ';
  const WHERE = 'WHERE sale_id = ?;';

  const QUERY = SELECT + INNER_JOIN + WHERE;

  return database.execute(QUERY, [id]);
}

function registerSale() {
  const QUERY = 'INSERT INTO sales (`date`) VALUES (NOW());';

  return database.execute(QUERY);
}

function deleteSale(id) {
  const QUERY = 'DELETE FROM sales WHERE id = ?';

  return database.execute(QUERY, [id]);
}

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  deleteSale,
};
