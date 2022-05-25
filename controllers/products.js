const express = require('express');
const { getAllProducts, getProductById } = require('../services/products');

const routes = express.Router();

routes.get('/', async (_request, response) => {
  const [products] = await getAllProducts();

  response.status(200).json(products);
});

routes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const [[product]] = await getProductById(id);

  if (!product) return response.status(404).json({ message: 'Product not found' });

  response.status(200).json(product);
});

module.exports = routes;
