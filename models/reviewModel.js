const mongoose = require("mongoose");
const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can not be empty!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tour: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Tour",
            required: [true, "Review must belong to a tour."]
        }
    ],
    user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Review must belong to a user."]
        }
    ]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

//* Duplicate review error handling
// reviewSchema.index({ tour: 1 }, { unique: true });
// reviewSchema.index({ user: 1 }, { unique: true });

//! Query Middleware
reviewSchema.pre(/^find/, function (next) {
    //* In this code, `this.populate()` is used to fetch and include additional data related to the "guides" field within the document, 
    //* while excluding specific fields (in this case, "__v" and "passwordChangeAt") from the populated documents.
    // this.populate({
    //     path: "tour user",
    //     select: "name"
    // });

    //* Alternative Way
    // this.populate({
    //     path: "tour",
    //     select: "name"
    // }).populate({
    //     path: "user",
    //     select: "name"
    // });

    this.populate({
        path: "user",
        select: "name photo"
    });

    next();
});

//! Calculating Average Rating Review on Tour ratingsAverage
//* This code defines a static method in a Mongoose schema that calculates statistics (total number of ratings and average rating) for reviews 
//* associated with a specified tour using the MongoDB aggregation framework.
reviewSchema.statics.calcAverageRatings = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: "$tour",
                nRating: { $sum: 1 },
                avgRating: { $avg: "$rating" }
            }
        }
    ]);

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        });
    }
};

//* This part of the code sets up a post-save middleware in a Mongoose schema so that whenever a new review is saved, it triggers the `calcAverageRatings` 
//* static method on the model associated with the review, updating the average ratings for the corresponding tour.
reviewSchema.post("save", function () {
    this.constructor.calcAverageRatings(this.tour);
});

//! Calculating findByIdAndUpdate and findByIdAndDelete Review rating on Tour ratingsAverage
//* This JavaScript code defines a pre-middleware in a MongoDB schema model, specifically for operations starting with "findOneAnd...," which, 
//* before the main operation, performs a `findOne` operation on the database and stores the result in the `this.r` variable, allowing you to 
//* access and manipulate the found record after the operation is complete.
reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();

    next();
});

//* This JavaScript code defines a post-middleware for MongoDB schema models, specifically for operations starting with "findOneAnd...," 
//* which calculates the average ratings for a tour after the operation has been executed.
reviewSchema.post(/^findOneAnd/, async function () {
    //* "await this.findOne();" does NOT work here, query has already executed  
    await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;