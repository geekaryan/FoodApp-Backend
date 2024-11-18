const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.post('/signup', authController.singUp);
router.post('/login', authController.login);

router.route('/').get(userController.findAll);
router.route('/:id').get(userController.findOne);

module.exports = router;
