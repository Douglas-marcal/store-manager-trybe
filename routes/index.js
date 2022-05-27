const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const errorHandling = require('../middlewares/errorHandling');
const validateProduct = require('../middlewares/validateProduct');
const validateSale = require('../middlewares/validateSale');

const routes = express.Router();

routes.get('/products', productsController.getAllProducts);
routes.get('/products/:id', productsController.getProductById);
routes.post('/products', validateProduct, productsController.registerProduct);
routes.put('/products/:id', validateProduct, productsController.updateProduct);
routes.delete('/products/:id', productsController.deleteProduct);

routes.get('/sales', salesController.getAllSales);
routes.get('/sales/:id', salesController.getSaleById);
routes.post('/sales', validateSale, salesController.registerSale);

routes.use(errorHandling);

module.exports = routes;
