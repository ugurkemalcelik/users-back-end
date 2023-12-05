const mongoose = require("mongoose");
let slugify = require("slugify");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    title: {
        type: String,
        require: [true,"Please provide a question"],
        minLength: [10,"Please provide a question with minLength 10 characters"],
        unique: true
    },
    content: {
        type: String,
        require: [true,"Please provide a content"],
        minLength: [10,"Please provide a content with minLength 10 characters"]
    },
    slug: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    questionOwnerName :{
        type: String
    },
    answerId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Answer"
        }
    ],
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = mongoose.model("Question",QuestionSchema);