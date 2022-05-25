const express = require('express');
const { getAllProducts } = require('../services/products');

const routes = express.Router();

routes.get('/', async (_request, response) => {
  const [products] = await getAllProducts();

  response.status(200).json(products);
});

module.exports = routes;
