const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/sales');
const salesProductsModel = require('../../../models/salesProducts');
const mockAllSales = require('./mock/salesDatabase/allSales');
const mockSaleById = require('./mock/salesDatabase/saleById')
const database = require('../../../database');
const mockRegisterSale = require('./mock/salesDatabase/registerSale');
const mockResponseUpdateSale = require('./mock/salesProductsDatabase/updateSale');

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

      const [sales] = await salesModel.getAllSales();

      expect(sales).to.be.an('array');

      database.execute.restore();
    });

    it('returns all sales', async () => {
      sinon.stub(database, 'execute').resolves(mockAllSales);

      const [sales] = await salesModel.getAllSales();

      expect(sales.length).to.be.equal(3);

      database.execute.restore();
    });

    it('sales has keys "sale_id", "date", "product_id", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockAllSales);

      const [sales] = await salesModel.getAllSales();

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

      const [sale] = await salesModel.getSaleById(1);

      expect(sale.length).to.be.equal(2);

      database.execute.restore();
    });

    it('array contains an object', async () => {
      sinon.stub(database, 'execute').resolves(mockSaleById);

      const [sale] = await salesModel.getSaleById(1);

      expect(sale[0]).to.be.an('object');

      database.execute.restore();
    });

    it('object contains keys "date", "product_id", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockSaleById);

      const [sale] = await salesModel.getSaleById(1);

      sale.forEach((product) => {
        expect(product).to.contains.keys('date', 'product_id', 'quantity');
      });

      database.execute.restore();
    });
  });

  describe('function registerSale', () => {
    it('should return a promise', async () => {
      sinon.stub(database, 'execute').resolves(mockRegisterSale)

      const [result] = await salesModel.registerSale();

      expect(result).to.be.contains.keys('affectedRows', 'insertId');

      database.execute.restore();
    });
  });

  describe('function registerSalesProducts', () => {
    beforeEach(() => {
      sinon.stub(database, 'execute').resolves()
    });

    afterEach(() => {
      database.execute.restore();
    });

    it('should return an object', async () => {
      const sale = {
        id: 4,
        productId: 1,
        quantity: 30,
      };

      const result = await salesProductsModel.registerSalesProducts(sale);

      expect(result).to.be.an('object');
    });

    it('should return keys "id", "productId", "quantity"', async () => {
      const sale = {
        id: 4,
        productId: 1,
        quantity: 30,
      };

      const result = await salesProductsModel.registerSalesProducts(sale);

      expect(result).to.be.contains.keys('id', 'productId', 'quantity');
    });
  });

  describe('function updateSale', () => {
    beforeEach(() => {
      sinon.stub(database, 'execute').resolves(mockResponseUpdateSale);
    });

    afterEach(() => {
      database.execute.restore();
    });

    it('should return an array', async () => {
      const saleItems = [
        {
          "productId": 1,
          "quantity": 30
        }
      ]

      const result = await salesProductsModel.updateSale(1, saleItems);

      expect(result).to.be.an('array');
    });

    it('should first position array contains an object', async () => {
      const saleItems = [
        {
          "productId": 1,
          "quantity": 30
        }
      ]

      const [result] = await salesProductsModel.updateSale(1, saleItems);

      expect(result).to.be.an('object');
    });

    it('should object contain key "affectedRows"', async () => {
      const saleItems = [
        {
          "productId": 1,
          "quantity": 30
        }
      ]

      const [result] = await salesProductsModel.updateSale(1, saleItems);

      expect(result).to.be.contain.keys('affectedRows');
    });
  });
});
