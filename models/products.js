const database = require('../database');

function getAllProducts() {
  return database.execute('SELECT * FROM products ORDER BY id ASC');
}

function getProductById(id) {
  return database.execute('SELECT * FROM products WHERE id = ?', [id]);
}

module.exports = {
  getAllProducts,
  getProductById,
};
