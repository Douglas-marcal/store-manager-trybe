const express = require('express');
const { CODE } = require('../constants/httpStatus');
const { MESSAGE } = require('../constants/messages');
const getSales = require('../services/sales');

const routes = express.Router();

routes.get('/', async (_request, response) => {
  const sales = await getSales();

  response.status(CODE.OK).json(sales);
});

routes.get('/:id', async (request, response) => {
  const { id } = request.params;

  const sale = await getSales(id);

  if (sale.length === 0) return response.status(CODE.NOT_FOUND).json(MESSAGE.SALE_NOT_FOUND);

  response.status(CODE.OK).json(sale);
});

module.exports = routes;
