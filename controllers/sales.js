const express = require('express');
const getSales = require('../services/sales');

const routes = express.Router();

routes.get('/', async (_request, response) => {
  const sales = await getSales();

  response.status(200).json(sales);
});

module.exports = routes;
