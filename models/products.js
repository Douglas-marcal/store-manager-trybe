const database = require('../database');

function getAllProducts() {
  return database.execute('SELECT * FROM products ORDER BY id ASC');
}

function getProductById(id) {
  return database.execute('SELECT * FROM products WHERE id = ?', [id]);
}

async function registerProduct(product) {
  const { name, quantity } = product;

  const QUERY = 'INSERT INTO products (name, quantity) VALUES (?, ?);';

  const [productAdded] = await database.execute(QUERY, [name, quantity]);

  const response = {
    id: productAdded.insertId,
    name,
    quantity,
  };

  return response;
}

async function updateProduct(id, product) {
  const { name, quantity } = product;

  const QUERY = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?;';

  const [response] = await database.execute(QUERY, [name, quantity, id]);

  return response.affectedRows;
}

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
};
