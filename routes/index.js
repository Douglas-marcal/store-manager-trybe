const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');

const routes = express.Router();

routes.use('/products', productsController);

routes.use('/sales', salesController);

module.exports = routes;
