const sinon = require('sinon');
const { expect } = require('chai');
const { getAllSales, getSaleById } = require('../../../models/sales');
const mockAllSales = require('./mock/salesDatabase/allSales');
const mockSaleById = require('./mock/salesDatabase/saleById')
const database = require('../../../database');

describe('sales model tests', () => {
  describe('function getAllSales', () => {
    before(() => {
      sinon.stub(database, 'execute').resolves(mockAllSales);
    });

    after(() => {
      database.execute.restore();
    });

    it('returns an array', async () => {
      const [sales] = await getAllSales();

      expect(sales).to.be.an('array');
    });

    it('returns all sales', async () => {
      const [sales] = await getAllSales();

      expect(sales.length).to.be.equal(3);
    });

    it('sales has keys "sale_id", "date", "product_id", "quantity"', async () => {
      const [sales] = await getAllSales();

      sales.forEach((sale) => {
        expect(sale).to.contains.keys('sale_id', 'date', 'product_id', 'quantity');
      });

    });
  });

  describe('function getSaleById', () => {
    before(() => {
      sinon.stub(database, 'execute').resolves(mockSaleById);
    });

    after(() => {
      database.execute.restore();
    });

    it('returns an array', async () => {
      const [sale] = await getSaleById(1);

      expect(sale.length).to.be.equal(2);
    });

    it('array contains an object', async () => {
      const [sale] = await getSaleById(1);

      expect(sale[0]).to.be.an('object');
    });

    it('object contains keys "date", "product_id", "quantity"', async () => {
      const [sale] = await getSaleById(1);

      sale.forEach((product) => {
        expect(product).to.contains.keys('date', 'product_id', 'quantity');
      });

      
    });
  });
});
