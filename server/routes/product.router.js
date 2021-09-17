var express = require('express');
var router = express.Router();

let productController = require('../controller/product.controller');

router.get('/', productController.fetchAllProducts);

module.exports = router;
