const sinon = require('sinon');
const { expect } = require("chai");
const mockAllSales = require('./mock/salesModel/allSales');
const mockSaleById = require('./mock/salesModel/saleById');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');

describe('sales services tests', () => {
  describe('function getSales without parameter', () => {
    // before(() => {
    //   sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);
    // });

    // after(() => {
    //   salesModel.getAllSales.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);
      const sales = await salesService.getSales();

      expect(sales).to.be.an('array');

      salesModel.getAllSales.restore();
    });

    it('returns all sales', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);
      const sales = await salesService.getSales();

      expect(sales.length).to.be.equal(3);

      salesModel.getAllSales.restore();
    });

    it('array contains objects', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);
      const sales = await salesService.getSales();

      sales.forEach((product) => {
        expect(product).to.be.an('object');
      });

      salesModel.getAllSales.restore();
    });

    it('object contains keys "saleId", "date", "productId", "quantity"', async () => {
      sinon.stub(salesModel, 'getAllSales').resolves(mockAllSales);
      const sales = await salesService.getSales();

      sales.forEach((product) => {
        expect(product).to.contains.keys('saleId', 'date', 'productId', 'quantity');
      });

      salesModel.getAllSales.restore();
    });

  });

  describe('function getSales with parameter', () => {
    // before(() => {
    //   sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);
    // });

    // after(() => {
    //   salesModel.getSaleById.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);
      const sales = await salesService.getSales(1);

      expect(sales).to.be.an('array');

      salesModel.getSaleById.restore();
    });

    it('returns an unique product', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);
      const sales = await salesService.getSales(1);

      expect(sales.length).to.be.equal(2);
      
      salesModel.getSaleById.restore();
    });

    it('array contains an object', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);
      const sales = await salesService.getSales(1);

      sales.forEach((product) => {
        expect(product).to.be.an('object');
      });

      salesModel.getSaleById.restore();
    });

    it('object contains keys "date", "productId", "quantity"', async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(mockSaleById);
      const sales = await salesService.getSales(1);

      sales.forEach((product) => {
        expect(product).to.contains.keys('date', 'productId', 'quantity');
      });

      salesModel.getSaleById.restore();
    });
  });

});
