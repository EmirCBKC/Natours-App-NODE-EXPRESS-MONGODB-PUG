const mongoose = require("mongoose");
const Tour = require("./tourModel");

const likeSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: [true, "Like can not be empty!"]
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

//! Query Middleware
likeSchema.pre(/^find/, function (next) {

    this.populate({
        path: "user",
        select: "name photo"
    }).populate({
        path: "tour",
        select: "name"
    });

    next();
});

//! Calculating Count Like on Tour likesCount
likeSchema.statics.calcCountLikes = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: "$tour",
                nLike: { $sum: 1 },
            }
        }
    ]);

    if (stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            likesCount: stats[0].nLike,
        });
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            likesCount: 0,
        });
    }
};

likeSchema.post("save", function () {
    this.constructor.calcCountLikes(this.tour);
});

//! Calculating findByIdAndUpdate and findByIdAndDelete Like count on Tour likesCount
likeSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.findOne();

    next();
});

likeSchema.post(/^findOneAnd/, async function () {
    await this.r.constructor.calcCountLikes(this.r.tour);
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;