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
  console.log(productAdded);

  const response = {
    id: productAdded.insertId,
    name,
    quantity,
  };

  return response;
}

module.exports = {
  getAllProducts,
  getProductById,
  registerProduct,
};
