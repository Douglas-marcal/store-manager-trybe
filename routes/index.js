const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');
const errorHandling = require('../middlewares/errorHandling');

const routes = express.Router();

routes.use('/products', productsController);

routes.use('/sales', salesController);

routes.use(errorHandling);

module.exports = routes;
