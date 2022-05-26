const sinon = require('sinon');
const { expect } = require("chai");
const productsService = require("../../../services/products");
const mockAllProducts = require('./mock/productModel/allProducts');
const mockProductById = require('./mock/productModel/productById');
const productsModel = require('../../../models/products');

describe('products services tests', () => {
  describe('function getProducts without parameter', () => {
    before(() => {
      sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('returns an array', async () => {
      const [products] = await productsService.getProducts();

      expect(products).to.be.an('array');
    });

    it('returns all products', async () => {
      const [products] = await productsService.getProducts();

      expect(products.length).to.be.equal(3);
    });

    it('array contains objects', async () => {
      const [products] = await productsService.getProducts();

      products.forEach((product) => {
        expect(product).to.be.an('object');
      });
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      const [products] = await productsService.getProducts();

      products.forEach((product) => {
        expect(product).to.contains.keys('id', 'name', 'quantity');
      });
    });

  });

  describe('function getProducts with parameter', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves(mockProductById);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('returns an array', async () => {
      const [products] = await productsService.getProducts(3);

      expect(products).to.be.an('array');
    });

    it('returns an unique product', async () => {
      const [products] = await productsService.getProducts(3);

      expect(products.length).to.be.equal(1);
    });

    it('array contains an object', async () => {
      const [products] = await productsService.getProducts(3);

      products.forEach((product) => {
        expect(product).to.be.an('object');
      });
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      const [products] = await productsService.getProducts(3);

      products.forEach((product) => {
        expect(product).to.contains.keys('id', 'name', 'quantity');
      });
    });
  });

});
