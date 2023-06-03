const express = require('express');
const MenuController = require('./../controllers/MenuController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/').get(MenuController.find).post(MenuController.create);

router
  .route('/:id')
  .get(MenuController.findById)
  .patch(MenuController.update)
  .delete(MenuController.delete);

module.exports = router;
