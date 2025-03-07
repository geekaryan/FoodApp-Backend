const ReviewController = require('./../controllers/reviewController');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(ReviewController.getAllreview)
  .post(ReviewController.createReview);

router
  .route('/:id')
  .get(ReviewController.getOneReview)
  .delete(ReviewController.deleteReview);

module.exports = router;
