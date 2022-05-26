const sinon = require('sinon');
const { expect } = require('chai');
const { getAllProducts, getProductById } = require('../../../models/products');
const database = require('../../../database');
const mockAllProducts = require('./mock/productsDatabase/allProducts');
const mockProductById = require('./mock/productsDatabase/productById');

describe('products model tests', () => {
  describe('function getAllProducts', () => {
    // before(() => {
    //   sinon.stub(database, 'execute').resolves(mockAllProducts);
    // });

    // after(() => {
    //   database.execute.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await getAllProducts();

      expect(products).to.be.an('array');

      database.execute.restore();
    });

    it('returns all products', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await getAllProducts();

      expect(products.length).to.be.equal(3);

      database.execute.restore();
    });

    it('products has keys "id", "name", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await getAllProducts();

      products.forEach(product => {
        expect(product).to.contains.keys("id", "name", "quantity");
      });

      database.execute.restore();
    });
  });

  describe('function getProductById', () => {
    // before(() => {
    //   sinon.stub(database, 'execute').resolves(mockProductById);
    // });

    // after(() => {
    //   database.execute.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await getProductById(3);

      expect(product.length).to.be.equal(1);

      database.execute.restore();
    });

    it('array contains an object', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await getProductById(3);

      expect(product[0]).to.be.an('object');

      database.execute.restore();
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await getProductById(3);

      expect(product[0]).to.contains.keys("id", "name", "quantity");

      database.execute.restore();
    });
  });
});
