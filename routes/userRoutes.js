const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

//* These codes perform the same function
//? 1-) router.post("/login", authController.login);
//? 2-) router.route("/login").post(authController.login);

router
    .post("/signup", authController.signup);
router
    .post("/login", authController.login);
router
    .get("/logout", authController.logout);
router
    .post("/forgotPassword", authController.forgotPassword);
router
    .patch("/resetPassword/:token", authController.resetPassword);

//* Protect all routes after this middleware
router.use(authController.protect);

router
    .patch("/updateMyPassword", authController.updatePassword);
router
    .get("/me", userController.getMe, userController.getUser);
router
    .patch("/updateMe", userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);
router
    .delete("/deleteMe", userController.deleteMe);

//* Protect all routes after this middleware - Example => authController.protect + authController.restrictTo("admin")
router.use(authController.restrictTo("admin"));

router
    .route("/")
    .get(userController.getAllUsers);
router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;