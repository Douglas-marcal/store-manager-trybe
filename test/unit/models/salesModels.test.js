const sinon = require('sinon');
const { expect } = require('chai');
const { getAllSales, getSaleById } = require('../../../models/sales');
const mockAllSales = require('./mock/salesDatabase/allSales');
const mockSaleById = require('./mock/salesDatabase/saleById')
const database = require('../../../database');

describe('sales model tests', () => {
  describe('function getAllSales', () => {
    // before(() => {
    //   sinon.stub(database, 'execute').resolves(mockAllSales);
    // });

    // after(() => {
    //   database.execute.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(database, 'execute').resolves(mockAllSales);

      const [sales] = await getAllSales();

      expect(sales).to.be.an('array');

      database.execute.restore();
    });

    it('returns all sales', async () => {
      sinon.stub(database, 'execute').resolves(mockAllSales);

      const [sales] = await getAllSales();

      expect(sales.length).to.be.equal(3);

      database.execute.restore();
    });

    it('sales has keys "sale_id", "date", "product_id", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockAllSales);

      const [sales] = await getAllSales();

      sales.forEach((sale) => {
        expect(sale).to.contains.keys('sale_id', 'date', 'product_id', 'quantity');
      });

      database.execute.restore();
    });
  });

  describe('function getSaleById', () => {
    // before(() => {
    //   sinon.stub(database, 'execute').resolves(mockSaleById);
    // });

    // after(() => {
    //   database.execute.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(database, 'execute').resolves(mockSaleById);

      const [sale] = await getSaleById(1);

      expect(sale.length).to.be.equal(2);

      database.execute.restore();
    });

    it('array contains an object', async () => {
      sinon.stub(database, 'execute').resolves(mockSaleById);

      const [sale] = await getSaleById(1);

      expect(sale[0]).to.be.an('object');

      database.execute.restore();
    });

    it('object contains keys "date", "product_id", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockSaleById);

      const [sale] = await getSaleById(1);

      sale.forEach((product) => {
        expect(product).to.contains.keys('date', 'product_id', 'quantity');
      });

      database.execute.restore();
    });
  });
});
