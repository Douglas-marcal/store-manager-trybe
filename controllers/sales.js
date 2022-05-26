const { CODE } = require('../constants/httpStatus');
const { MESSAGE } = require('../constants/messages');
const { getSales } = require('../services/sales');

async function getAllSales(request, response) {
  const sales = await getSales();
  
  response.status(CODE.OK).json(sales);
}

async function getSaleById(request, response) {
  const { id } = request.params;
  
  const sale = await getSales(id);
  
  if (sale.length === 0) return response.status(CODE.NOT_FOUND).json(MESSAGE.SALE_NOT_FOUND);
  
  response.status(CODE.OK).json(sale);
}

module.exports = {
  getAllSales,
  getSaleById,
};
