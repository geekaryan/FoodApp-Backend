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
    menuItem: {
      type: mongoose.Schema.ObjectId,
      ref: 'Menu',
      required: [true, 'Review must belong to a food item'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//here we are making things unique such that a user can only review a food item once
reviewSchema.index({ menuItem: 1, user: 1 }, { unique: true }); //finally it works we are only
//getting one review per user and food item

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

//In this we have to connect user and the food item such that they will going to form a relationship otherwise the route is working fine
