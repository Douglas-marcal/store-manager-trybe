const sinon = require('sinon');
const { expect } = require("chai");
const productsService = require("../../../services/products");
const productsController = require('../../../controllers/products');
const mockAllProducts = require('./mock/productsService/allProducts');
const mockProductById = require('./mock/productsService/productById');
const mockServiceReturn = require('./mock/productsService/registerProduct');

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

    it('should return status 200', async () => {
      await productsController.getAllProducts(request, response);

      const result = response.status.calledWith(200)

      expect(result).to.be.true;
    });

    it('should return json with an array', async () => {
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
    
    it('should return status 200', async () => {
      request.params = { id: 2 };

      await productsController.getProductById(request, response);

      const result = response.status.calledWith(200);

      expect(result).to.be.true;
    });

    it('should return json with an object', async () => {
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

    it('should return status 404', async () => {
      request.params = { id: 52 };

      await productsController.getProductById(request, response);

      const result = response.status.calledWith(404);


      expect(result).to.be.true;
    });

    it('should return message not found', async () => {
      request.params = { id: 52 };

      await productsController.getProductById(request, response);

      const result = response.json.calledWith(sinon.match.object);

      expect(result).to.be.true;
    });
  });

  describe('function registerProduct', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'registerProduct').resolves(mockServiceReturn);
    });

    afterEach(() => {
      productsService.registerProduct.restore();
    });

    it('should return status 200', async () => {
      request.body = { name: 'Chinelo Havaianas', quantity: 30 };

      await productsController.registerProduct(request, response);

      const result = response.status.calledWith(201);

      expect(result).to.be.true;
    });

    it('should return json with an object', async () => {
      request.body = { name: 'Chinelo Havaianas', quantity: 30 };

      await productsController.registerProduct(request, response);

      const result = response.json.calledWith(mockServiceReturn);

      expect(result).to.be.true;
    });
  });

  describe('function registerProduct: case already registered', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsService, 'registerProduct').resolves(null)
    });

    afterEach(() => {
      productsService.registerProduct.restore();
    });

    it('should return status 409', async () => {
      request.body = { name: 'Chinelo Havaianas', quantity: 30 };

      await productsController.registerProduct(request, response);

      const result = response.status.calledWith(409);

      expect(result).to.be.true;
    });

    it('should return json with an object', async () => {
      request.body = { name: 'Chinelo Havaianas', quantity: 30 };

      const messageError = {
        "status": 409,
        "message": "Product already exists"
      }

      await productsController.registerProduct(request, response);

      const result = response.json.calledWith(messageError);

      expect(result).to.be.true;
    });
  });
});
