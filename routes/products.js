const express = require('express');
const productsController = require('../controllers/products');

const routes = express.Router();

routes.use('/products', productsController);

module.exports = routes;
