const express = require("express");
const likeController = require("../controllers/likeController");
const authController = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
    .route("/")
    .get(likeController.getAllLikes)
    .post(authController.restrictTo("user", "admin"), likeController.setTourUserIds, likeController.createLike);

router
    .route("/:id")
    .get(likeController.getLike)
    .delete(authController.restrictTo("user", "admin"), likeController.deleteLike);

module.exports = router;