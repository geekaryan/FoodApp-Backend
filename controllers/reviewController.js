const Review = require('./../modal/reviewmodal');

//--> create a review
exports.createReview = async (req, res, next) => {
  try {
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      length: newReview.length,
      data: {
        newReview,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e.message,
    });
  }
};

//-->get all reviews
exports.getAllreview = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      status: 'success',
      length: data.length,
      data: {
        reviews,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e.message,
    });
  }
};

//-> get one reviews
exports.getOneReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        review,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e.message,
    });
  }
};

//-> delete a review
exports.deleteReview = async (req, res, next) => {
  try {
    const deleteReview = await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e.message,
    });
  }
};
