const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router
    .get("/", bookingController.createBookingCheckout, authController.isLoggedIn, viewsController.getOverview);

router
    .get("/tour/:slug", authController.isLoggedIn, viewsController.getTour);

router
    .get("/login", authController.isLoggedIn, viewsController.getLoginForm);

router
    .get("/signup", authController.isLoggedIn, viewsController.getSignupForm);

router
    .get("/me", authController.protect, viewsController.getAccount);

router
    .get("/my-tours", authController.protect, viewsController.getMyTours);

router
    .get("/my-reviews", authController.protect, viewsController.getMyReviews);

router
    .get("/my-favourites", authController.protect, viewsController.getMyLikes);

router
    .get("/manage-tours", authController.protect, authController.restrictTo("admin"), viewsController.getManageTours);

router
    .get("/manage-users", authController.protect, authController.restrictTo("admin"), viewsController.getManageUsers);

router
    .get("/manage-reviews", authController.protect, authController.restrictTo("admin"), viewsController.getManageReviews);

router
    .get("/manage-bookings", authController.protect, authController.restrictTo("admin"), viewsController.getManageBookings);

router
    .get("/forget", authController.isLoggedIn, viewsController.getForgetPasswordForm);

router
    .get("/reset", authController.isLoggedIn, viewsController.getResetPasswordForm);

//* NORMAL WAY (WITHOUT API)
// router
//     .post("/submit-user-data", authController.protect, viewsController.updateUserData);


module.exports = router;