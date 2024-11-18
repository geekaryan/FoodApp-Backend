const express = require('express');
const OrderController = require('./../controllers/OrderController');

const router = express.Router();

router
  .route('/')
  .get(OrderController.findAll)
  .post(OrderController.createOrder);

router
  .route('/:id')
  .delete(OrderController.delete)
  .get(OrderController.findOne);
module.exports = router;
