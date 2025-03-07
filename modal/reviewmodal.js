const mongoose = require('mongoose');

//review,, rating, createdAt, tour, user, {toJSON: {virtuals: true}, {toObject: {virtuals: true}}}

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'There must be a review'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

//In this we have to connect user and the food item such that they will going to form a relationship otherwise the route is working fine
