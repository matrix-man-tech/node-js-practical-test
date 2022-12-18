const mongoose = require('mongoose')

const InsightSchema = new mongoose.Schema({
    domainName: {
        type: String,
        required: [true, "Domain name is required"],

    },
    wordCount: {
        type: Number,
        required: [true, "Word Count is required"],
        default: 0
    },
    isFavourite: {
        type: Boolean,
        default: false
    },

    webLinks: [
        {
            type: Array,
            default: []
        }
    ],

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please.. User is required "]
    },

},
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    })


const Insight = mongoose.model("Insight", InsightSchema)

module.exports = Insight