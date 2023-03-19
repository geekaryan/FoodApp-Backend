const express = require("express");
const FoodController = require("./../controllers/FoodController");

const router = express.Router();

router.route("/").get(FoodController.getOrder).post(FoodController.createOrder);

router
  .route("/:id")
  .get(FoodController.findbyOne)
  .patch(FoodController.update)
  .delete(FoodController.delete);

module.exports = router;
