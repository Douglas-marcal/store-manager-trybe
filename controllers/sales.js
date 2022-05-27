const { CODE } = require('../constants/httpStatus');
const { MESSAGE } = require('../constants/messages');
const salesService = require('../services/sales');

async function getAllSales(_request, response) {
  const sales = await salesService.getSales();
  
  response.status(CODE.OK).json(sales);
}

async function getSaleById(request, response) {
  const { id } = request.params;
  
  const sale = await salesService.getSales(id);
  
  if (sale.length === 0) return response.status(CODE.NOT_FOUND).json(MESSAGE.SALE_NOT_FOUND);
  
  response.status(CODE.OK).json(sale);
}

async function registerSale(request, response) {
  const { body } = request;

  const sale = await salesService.registerSale(body);

  response.status(CODE.CREATED).json(sale);
}

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
};
