const sinon = require('sinon');
const { expect } = require("chai");
const mockAllSales = require('./mock/salesModel/allSales');
const mockSaleById = require('./mock/salesModel/saleById');
const salesModel = require('../../../models/sales');
const salesService = require('../../../services/sales');
const salesProductsModel = require('../../../models/salesProducts');
const mockResponseDatabaseRegistered = require('./mock/salesModel/registerSale');
const mockUpdateSale = require('./mock/salesModel/updateSale');

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

  describe('function registerSale', () => {
    const mockModelRegisterSalesProducts = { id: 3, productId: 1, quantity: 2 };
    beforeEach(() => {
      sinon.stub(salesModel, 'registerSale').resolves(mockResponseDatabaseRegistered);
      sinon.stub(salesProductsModel, 'registerSalesProducts')
        .resolves(mockModelRegisterSalesProducts);
    });

    afterEach(() => {
      salesModel.registerSale.restore();
      salesProductsModel.registerSalesProducts.restore();
    });

    it('should return correct response', async () => {
      const product = [
        {
          "productId": 1,
          "quantity": 2
        }
    ];

      const result = await salesService.registerSale(product);

    const response = {
      id: 3,
      itemsSold: [
        {
          productId: 1,
          quantity: 2
        }
      ]
    }

    expect(result).to.be.deep.equal(response)
    })
  });

  describe('function updateSale', () => {
    beforeEach(() => {
      sinon.stub(salesProductsModel, 'updateSale').resolves(mockUpdateSale);
    });

    afterEach(() => {
      salesProductsModel.updateSale.restore();
    });

    it('should return an object with keys "saleId" and "itemUpdated"', async () => {
      const saleItems = [
        {
          "productId": 1,
          "quantity": 30
        }
      ]

      const result = await salesService.updateSale(1, saleItems);

      expect(result).to.be.an('object');
      expect(result).to.be.contains.keys('saleId', 'itemUpdated');
    });
  });
});
