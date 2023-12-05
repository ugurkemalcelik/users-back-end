const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({

    content: {
        type: String,
        required: [true,"Please provide an answer"],
        minLength: [10,"Please provide an answer with minLength 10 characters"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    answerOwnerName: {
        type: String
    },
    questionId: {
        type: mongoose.Types.ObjectId,
        ref: "Question"
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = mongoose.model("Answer",AnswerSchema);