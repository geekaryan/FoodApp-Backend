const express = require('express');
const FoodController = require('./../controllers/FoodController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, FoodController.getOrder) //not making protected route for now..
  // .get(FoodController.getOrder)
  .post(FoodController.createOrder);

router
  .route('/:id')
  .get(FoodController.findbyOne)
  .patch(FoodController.update)
  .delete(FoodController.delete);

module.exports = router;
