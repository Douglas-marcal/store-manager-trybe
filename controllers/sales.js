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

  if (!sale) return response.status(CODE.UNPROCESSABLE_ENTITY).json(MESSAGE.OUT_OF_STOCK);

  response.status(CODE.CREATED).json(sale);
}

async function updateSale(request, response) {
  const { body, params: { id } } = request;

  const saleItems = [...body];

  const saleUpdated = await salesService.updateSale(id, saleItems);

  response.status(CODE.OK).json(saleUpdated);
}

async function deleteSale(request, response) {
  const { id } = request.params;

  const saleDeleted = await salesService.deleteSale(id);

  if (!saleDeleted) return response.status(CODE.NOT_FOUND).json(MESSAGE.SALE_NOT_FOUND);

  response.status(CODE.NO_CONTENT).end();
}

module.exports = {
  getAllSales,
  getSaleById,
  registerSale,
  updateSale,
  deleteSale,
};
