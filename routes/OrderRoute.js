const express = require('express');
const OrderController = require('./../controllers/OrderController');

const router = express.Router();

router
  .route('/')
  .get(OrderController.findAll)
  .post(OrderController.createOrder);

module.exports = router;
