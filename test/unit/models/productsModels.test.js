const sinon = require('sinon');
const { expect } = require('chai');
const { getAllProducts, getProductById } = require('../../../models/products');
const database = require('../../../database');
const mockProducts = require('./mock/mockDatabaseProducts');
const mockProductById = require('./mock/mockDatabaseProductById');

describe('model tests', () => {
  describe('function getAllProducts', () => {
    before(() => {
      sinon.stub(database, 'execute').resolves(mockProducts);
    });

    after(() => {
      database.execute.restore();
    });

    it('returns an array', async () => {
      const [products] = await getAllProducts();

      expect(products).to.be.an('array');
    });

    it('returns all products', async () => {
      const [products] = await getAllProducts();

      expect(products.length).to.be.equal(3);
    });

    it('products has keys "id", "name", "quantity"', async () => {
      const [products] = await getAllProducts();

      expect(products[0]).to.contains.keys("id", "name", "quantity");
    });
  });

  describe('function getProductById', () => {
    before(() => {
      sinon.stub(database, 'execute').resolves(mockProductById);
    });

    after(() => {
      database.execute.restore();
    });

    it('returns an array', async () => {
      const [product] = await getProductById(3);

      expect(product.length).to.be.equal(1);
    });

    it('array contains an object', async () => {
      const [product] = await getProductById(3);

      expect(product[0]).to.be.an('object');
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      const [product] = await getProductById(3);

      expect(product[0]).to.contains.keys("id", "name", "quantity");
    });
  });
});
