const salesModel = require('../models/sales');
const salesProductsModel = require('../models/salesProducts');
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

async function registerSale(products) {
  const [saleRegistered] = await salesModel.registerSale();

  const insertedSales = products.reduce((accumulator, product) => {
    const id = saleRegistered.insertId;

    const registerProduct = { id, ...product };

    const sale = salesProductsModel.registerSalesProducts(registerProduct);

    return [...accumulator, sale];
  }, []);

  const productsRegistered = await Promise.all(insertedSales);

  const { id } = productsRegistered[0];
  const itemsSold = productsRegistered.map(({ productId, quantity }) => ({ productId, quantity }));

  const response = {
    id,
    itemsSold,
  };

  return response;
}

async function updateSale(id, saleItems) {
  await salesProductsModel.updateSale(id, saleItems);

  const itemUpdated = saleItems.map(({ productId, quantity }) => ({ productId, quantity }));
  
  const response = { saleId: id, itemUpdated };

  return response;
}

function deleteSale(id) {
  return salesModel.deleteSale(id);
}

module.exports = { getSales, registerSale, updateSale, deleteSale };
