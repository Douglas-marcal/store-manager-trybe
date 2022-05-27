const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/products');
const database = require('../../../database');
const mockAllProducts = require('./mock/productsDatabase/allProducts');
const mockProductById = require('./mock/productsDatabase/productById');
const mockDatabaseResponse = require('./mock/productsDatabase/registerProduct');
const {
  mockResponseDatabaseUpdated,
  mockResponseDatabaseNotUpdated
} = require('./mock/productsDatabase/updateProduct');
const {
  mockResponseDatabaseDeleted,
  mockResponseDatabaseNotDeleted
} = require('./mock/productsDatabase/deleteProduct');

describe('products model tests', () => {
  describe('function getAllProducts', () => {
    // before(() => {
    //   sinon.stub(database, 'execute').resolves(mockAllProducts);
    // });

    // after(() => {
    //   database.execute.restore();
    // });

    it('should return an array', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await productsModel.getAllProducts();

      expect(products).to.be.an('array');

      database.execute.restore();
    });

    it('should return all products', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await productsModel.getAllProducts();

      expect(products.length).to.be.equal(3);

      database.execute.restore();
    });

    it('should products has keys "id", "name", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockAllProducts);

      const [products] = await productsModel.getAllProducts();

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

    it('should return an array', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await productsModel.getProductById(3);

      expect(product.length).to.be.equal(1);

      database.execute.restore();
    });

    it('should array contains an object', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await productsModel.getProductById(3);

      expect(product[0]).to.be.an('object');

      database.execute.restore();
    });

    it('should object contains keys "id", "name", "quantity"', async () => {
      sinon.stub(database, 'execute').resolves(mockProductById);

      const [product] = await productsModel.getProductById(3);

      expect(product[0]).to.contains.keys("id", "name", "quantity");

      database.execute.restore();
    });
  });

  describe('function registerProduct', () => {
    beforeEach(() => {
      sinon.stub(database, 'execute').resolves(mockDatabaseResponse);
    });

    afterEach(() => {
      database.execute.restore();
    });

    it('should return an object', async () => {
      const product = {
        name: 'Chinelo Havaianas',
        quantity: 30,
      }

      const result = await productsModel.registerProduct(product);

      const responseDatabase = {
        id: 4,
        ...product,
      };

      expect(result).to.be.deep.equal(responseDatabase);
    });
  });

  describe('function updateProduct', () => {    
    it('should return a number', async () => {
      sinon.stub(database, 'execute').resolves(mockResponseDatabaseUpdated);
      const product = {
        name: 'Chinelo Havaianas',
        quantity: 30,
      };
      
      const result = await productsModel.updateProduct(3, product);
      
      expect(result).to.be.equal(1);
      
      database.execute.restore();
    });
    
    it('should return zero if product does\'not exist', async () => {
      sinon.stub(database, 'execute').resolves(mockResponseDatabaseNotUpdated);
      const product = {
        name: 'Chinelo Ipanema',
        quantity: 30,
      };
      
      const result = await productsModel.updateProduct(369, product);
      
      expect(result).to.be.equal(0);
      
      database.execute.restore();
    });
  });

  describe('function deleteProduct', () => {
    it('should return a number', async () => {
      sinon.stub(database, 'execute').resolves(mockResponseDatabaseDeleted);
      const result = await productsModel.deleteProduct(3);
      
      expect(result).to.be.equal(2);

      database.execute.restore();
    });

    it('should return zero', async () => {
      sinon.stub(database, 'execute').resolves(mockResponseDatabaseNotDeleted);
      const result = await productsModel.deleteProduct(369);
      
      expect(result).to.be.equal(0);

      database.execute.restore();
    });
  });
});
