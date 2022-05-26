const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/sales');
const salesController = require('../../../controllers/sales');
const mockAllSales = require('./mock/salesService/allSales');
const mockSaleById = require('./mock/salesService/saleById');

describe('sales controller tests', () => {
  describe('function getSaleById', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves(mockAllSales);
    });

    afterEach(() => {
      salesService.getSales.restore();
    });

    it('should return status 200', async() => {
      await salesController.getAllSales(request, response);

      const result = response.status.calledWith(200);

      expect(result).to.be.true;
    });

    it('should return json with an array', async() => {
      await salesController.getAllSales(request, response);

      const result = response.json.calledWith(sinon.match.array);

      expect(result).to.be.true;
    });
  });

  describe('function getSaleById', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves(mockSaleById);
    });

    afterEach(() => {
      salesService.getSales.restore();
    });

    it('should return status 200', async () => {
      request.params = { id: 1 };
      await salesController.getSaleById(request, response);

      const result = response.status.calledWith(200);

      expect(result).to.be.true;
    });

    it('should return json with an array', async () => {
      request.params = { id: 1 };
      await salesController.getSaleById(request, response);

      const result = response.json.calledWith(sinon.match.array);

      expect(result).to.be.true;
    });
  });

  describe('function getSaleById: case not found', () => {
    const response = {};
    const request = {};

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getSales').resolves([]);
    });

    afterEach(() => {
      salesService.getSales.restore();
    });

    it('should return status 404', async () => {
      request.params = { id: 111 };
      await salesController.getSaleById(request, response);

      const result = response.status.calledWith(404);

      expect(result).to.be.true;
    });

    it('should return json with an object', async () => {
      request.params = { id: 111 };
      await salesController.getSaleById(request, response);

      const result = response.json.calledWith(sinon.match.object);

      expect(result).to.be.true;
    });
  });
});
