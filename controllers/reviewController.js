const Review = require("../models/reviewModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");

//? Middleware => Create new review on tour and request user.
exports.setTourUserIds = (req, res, next) => {
    //* Allow Nested Routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

exports.checkBooking = catchAsync(async (req, res, next) => {

    const bookingsUser = await Booking.find({ user: req.user.id });
    const toursIDs = bookingsUser.map(item => item.tour);

    const reviewsUser = await Review.find({ user: req.user.id });
    const reviewTourCheck = reviewsUser.map(item => item.tour);

    //* 1-) Booking Check
    toursIDs.forEach(item => {
        if (String(item._id) !== req.body.tour) {
            next(new AppError("Please make a booking first!", 400));
        }
    });

    //* 2-) Review Check
    for (const iterator of reviewTourCheck) {
        for (const iterator2 of iterator) {
            if (String(iterator2) === req.body.tour) {
                return next(new AppError("You have commented before!", 400));
            }
        }
    }

    next();

});

//! ROUTE HANDLERS
exports.getAllReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);