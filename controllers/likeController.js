const Like = require("../models/likeModel");
const factory = require("./handlerFactory");
// const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

//? Middleware => Create new like on tour and request user.
exports.setTourUserIds = (req, res, next) => {
    //* Allow Nested Routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    next();
};

//! ROUTE HANDLERS
exports.getAllLikes = factory.getAll(Like);

exports.getLike = factory.getOne(Like);

exports.createLike = factory.createOne(Like);

exports.deleteLike = factory.deleteOne(Like);