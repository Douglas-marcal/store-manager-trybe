const sinon = require('sinon');
const { expect } = require("chai");
const productsService = require("../../../services/products");
const productsController = require('../../../controllers/products');
const mockAllProducts = require('./mock/productsService/allProducts');
const mockProductById = require('./mock/productsService/productById');

describe('products controller tests', () => {
  describe('function getAllProducts', () => {
    const response = {};
    const request = {};
    
    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves(mockAllProducts);
    });

    afterEach(() => {
      productsService.getProducts.restore();
    });

    it('returns status 200', async () => {
      await productsController.getAllProducts(request, response);

      const result = response.status.calledWith(200)

      expect(result).to.be.true;
    });

    it('returns json with an array', async () => {
      await productsController.getAllProducts(request, response);

      const result = response.json.calledWith(sinon.match.array);

      expect(result).to.be.true;
    });
  });

  describe('function getProductById', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves(mockProductById);
    });
    
    afterEach(() => {
      productsService.getProducts.restore();
    });
    
    it('returns status 200', async () => {
      request.params = { id: 2 };

      await productsController.getProductById(request, response);

      const result = response.status.calledWith(200);

      expect(result).to.be.true;
    });

    it('returns json with an object', async () => {
      request.params = { id: 2 };

      await productsController.getProductById(request, response);

      const result = response.json.calledWith(sinon.match.object);


      expect(result).to.be.true;
    });
  });

  describe('function getProductById: case not found', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'getProducts').resolves([[]]);
    });
    
    afterEach(() => {
      productsService.getProducts.restore();
    });

    it('returns status 404', async () => {
      request.params = { id: 52 };

      await productsController.getProductById(request, response);

      const result = response.status.calledWith(404);


      expect(result).to.be.true;
    });

    it('returns message not found', async () => {
      request.params = { id: 52 };

      await productsController.getProductById(request, response);

      const result = response.json.calledWith(sinon.match.object);


      expect(result).to.be.true;
    });
  });

});
