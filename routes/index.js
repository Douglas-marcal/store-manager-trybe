const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const errorHandling = require('../middlewares/errorHandling');

const routes = express.Router();

routes.get('/products', productsController.getAllProducts);
routes.get('/products/:id', productsController.getProductById);

routes.get('/sales', salesController.getAllSales);
routes.get('/sales/:id', salesController.getSaleById);

routes.use(errorHandling);

module.exports = routes;
