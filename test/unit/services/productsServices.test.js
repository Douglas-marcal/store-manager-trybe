const sinon = require('sinon');
const { expect } = require("chai");
const productsService = require("../../../services/products");
const mockAllProducts = require('./mock/productModel/allProducts');
const mockProductById = require('./mock/productModel/productById');
const productsModel = require('../../../models/products');

describe('products services tests', () => {
  describe('function getProducts without parameter', () => {
    // before(() => {
    //   sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);
    // });

    // after(() => {
    //   productsModel.getAllProducts.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

      const [products] = await productsService.getProducts();

      expect(products).to.be.an('array');

      productsModel.getAllProducts.restore();
    });

    it('returns all products', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

      const [products] = await productsService.getProducts();

      expect(products.length).to.be.equal(3);

      productsModel.getAllProducts.restore();
    });

    it('array contains objects', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

      const [products] = await productsService.getProducts();

      products.forEach((product) => {
        expect(product).to.be.an('object');
      });

      productsModel.getAllProducts.restore();
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      sinon.stub(productsModel, 'getAllProducts').resolves(mockAllProducts);

      const [products] = await productsService.getProducts();

      products.forEach((product) => {
        expect(product).to.contains.keys('id', 'name', 'quantity');
      });

      productsModel.getAllProducts.restore();
    });

  });

  describe('function getProducts with parameter', () => {
    // before(() => {
    //   sinon.stub(productsModel, 'getProductById').resolves(mockProductById);
    // });

    // after(() => {
    //   productsModel.getProductById.restore();
    // });

    it('returns an array', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(mockProductById);

      const [products] = await productsService.getProducts(3);

      expect(products).to.be.an('array');

      productsModel.getProductById.restore();
    });

    it('returns an unique product', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(mockProductById);

      const [products] = await productsService.getProducts(3);

      expect(products.length).to.be.equal(1);

      productsModel.getProductById.restore();
    });

    it('array contains an object', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(mockProductById);

      const [products] = await productsService.getProducts(3);

      products.forEach((product) => {
        expect(product).to.be.an('object');
      });

      productsModel.getProductById.restore();
    });

    it('object contains keys "id", "name", "quantity"', async () => {
      sinon.stub(productsModel, 'getProductById').resolves(mockProductById);

      const [products] = await productsService.getProducts(3);

      products.forEach((product) => {
        expect(product).to.contains.keys('id', 'name', 'quantity');
      });

      productsModel.getProductById.restore();
    });
  });

});
