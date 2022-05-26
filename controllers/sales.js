const express = require('express');
const getSales = require('../services/sales');

const routes = express.Router();

routes.get('/', async (_request, response) => {
  const sales = await getSales();

  response.status(200).json(sales);
});

routes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const sale = await getSales(id);

  if (sale.length === 0) return response.status(404).json({ message: 'Sale not found' });

  response.status(200).json(sale);
});

module.exports = routes;
