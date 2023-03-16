const express = require("express");
const MenuController = require("./../controllers/MenuController");

const router = express.Router();

router.route("/").get(MenuController.find).post(MenuController.create);

module.exports = router;
