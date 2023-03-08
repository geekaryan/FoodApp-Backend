const express = require("express");
const FoodController = require("./../controllers/FoodController");

const router = express.Router();

router.route("/").get(FoodController.getOrder).post(FoodController.createOrder);

module.exports = router;
