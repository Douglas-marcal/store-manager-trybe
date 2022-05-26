const salesModel = require('../models/sales');
const { allSalesToCamelCase, saleByIdToCamelCase } = require('./utils/salesUtils');

async function getSales(id = null) {
  if (id) {
    const [sales] = await salesModel.getSaleById(id);

    const saleById = sales.map(saleByIdToCamelCase);

    return saleById;
  }

  const [sales] = await salesModel.getAllSales();
  const allSales = sales.map(allSalesToCamelCase);

  return allSales;
}

module.exports = { getSales };
