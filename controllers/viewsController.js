const User = require("../models/userModel");
const Tour = require("../models/tourModel");
const Review = require("../models/reviewModel");
const Like = require("../models/likeModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getOverview = catchAsync(async (req, res) => {

    //* 1-) Get tour data from collection
    const tours = await Tour.find();
    const likes = await Like.find();

    //* 2-) Build template


    //* 3-) Render that template using tour data from


    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("overview", {
            title: "All Tours",
            tours,
            likes
        });
});

exports.getTour = catchAsync(async (req, res, next) => {

    //* 1-) Get tour data from collection
    const tour = await Tour.findOne({ slug: req.params.slug })
        .populate({
            path: "reviews",
            fields: "review rating user"
        }).populate({
            path: "bookings",
            fields: "tour user"
        });

    if (!tour) {
        return next(new AppError("There is no tour with that name.", 404));
    }

    //* 2-) Build template


    //* 3-) Render that template using tour data from


    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://*.mapbox.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://api.mapbox.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("tour", {
            title: `${tour.name} Tour`,
            tour
        });
});

exports.getLoginForm = catchAsync(async (req, res) => {

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("login", {
            title: "Log into your account"
        });

});

exports.getSignupForm = catchAsync(async (req, res) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("signup", {
            title: "Welcome to the club"
        });
});

exports.getForgetPasswordForm = catchAsync(async (req, res) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("forgetPassword", {
            title: "Forget my password"
        });
});

exports.getResetPasswordForm = catchAsync(async (req, res) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("resetPassword", {
            title: "Reset my password"
        });
});

exports.getAccount = (req, res) => {
    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("account", {
            title: "Your account"
        });
};

exports.getMyTours = catchAsync(async (req, res, next) => {

    //* 1-) Find all bookings
    const bookings = await Booking.find({ user: req.user.id });

    //* 2-) Find tours with the returned IDs
    const tourIDs = bookings.map(item => item.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("myTours", {
            title: "My Tours",
            tours
        });

});

exports.getMyReviews = catchAsync(async (req, res, next) => {

    const reviews = await Review.find({ user: req.user.id });
    const toursIDs = reviews.map(item => item.tour);
    const tours = await Tour.find({ _id: { $in: toursIDs } });

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("myReviews", {
            title: "My Reviews",
            reviews,
            tours
        });

});

exports.getMyLikes = catchAsync(async (req, res, next) => {

    const likes = await Like.find({ user: req.user.id });
    const toursIDs = likes.map(item => item.tour);

    let tours;
    for (const item of toursIDs) {
        for (const item2 of item) {
            tours = await Tour.find({ _id: { $in: item2._id } });
        }
    }

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("myFavourites", {
            title: "My Favourites",
            likes,
            tours
        });

});

exports.getManageTours = catchAsync(async (req, res, next) => {

    const tours = await Tour.find();

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("manageTours", {
            title: "Manage Tours",
            tours
        });

});

exports.getManageUsers = catchAsync(async (req, res, next) => {

    const users = await User.find();

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("manageUsers", {
            title: "Manage Users",
            users
        });

});

exports.getManageReviews = catchAsync(async (req, res, next) => {

    const reviews = await Review.find();

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("manageReviews", {
            title: "Manage Reviews",
            reviews
        });

});

exports.getManageBookings = catchAsync(async (req, res, next) => {

    const bookings = await Booking.find();

    res.status(200)
        .set(
            'Content-Security-Policy',
            "default-src 'self' https://cdnjs.cloudflare.com https://js.stripe.com/v3/ ;base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src https://cdnjs.cloudflare.com https://js.stripe.com/v3/ 'self' blob: ;script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests;"
        )
        .render("manageBookings", {
            title: "Manage Bookings",
            bookings
        });

});

//* NORMAL WAY (WITHOUT API)
// exports.updateUserData = async (req, res, next) => {
//     console.log("UPDATING USER: ", req.body);

//     const updatedUser = await User.findByIdAndUpdate(req.user.id,
//         {
//             name: req.body.name,
//             email: req.body.email
//         },
//         {
//             new: true,
//             runValidators: true
//         }
//     );

//     res.status(200)
//         .render("account", {
//             title: "Your account",
//             user: updatedUser
//         });
// };