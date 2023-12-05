const expressAsyncHandler = require("express-async-handler");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const CustomError = require("../helpers/errors/CustomError");

const addAnswer = expressAsyncHandler(async (req,res,next) => {
    
    const {question_id} = req.params;

    const {content} = req.body;

    const answer = await Answer.create({

        content,
        userId: req.user.id,
        questionId: question_id,
        answerOwnerName: req.user.name
        
    })

    const question = await Question.findById(question_id);
    
    question.answerId.push(answer._id);

    question.save();

    res
    .status(200)
    .json({
        success: true,
        data: answer,
        message: "Answers had added successfully"
    })

}) 

const getAnswerToQuestion = expressAsyncHandler(async (req,res,next) => {

    const {question_id} = req.params;

    const answers = await Answer.find({
        questionId: question_id
    })

    res
    .status(200)
    .json({
        success: true,
        data: answers,
        message: "The Answers has gotten successfully"
    })

})

const editAnswerToQuestion = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const {content} = req.body;

    const answer = await Answer.findById(answer_id);

    answer.content = content;

    answer.save();

    res
    .status(200)
    .json({
        success: true,
        data: answer,
        message: "The Answer has edited Successfully"
    })

})

const deleteAnswer = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    await Answer.findByIdAndDelete({_id: answer_id});

    const question = await Question.findOne({
        answerId: answer_id
    })

    const index = question.answerId.indexOf(answer_id);

    question.answerId.splice(index,1);

    await question.save();

    res
    .status(200)
    .json({
        success: true,
        message: "Delete Answer is Successfull"
    })

})

const likeAnswer = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    if(answer.likes.includes(req.user.id)){
        return next(new CustomError("You already like this answer",400));
    }

    answer.likes.push(req.user.id);

    await answer.save();

    res
    .status(200)
    .json({
        success: true,
        data: answer,
        message: "You Liked This Answer Successfully"
    })

}) 

const undolikeAnswer = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    if(!answer.likes.includes(req.user.id)){
        return next(new CustomError("You don't like this answer before",400));
    }

    const index = answer.likes.indexOf(req.user.id);

    answer.likes.splice(index,1);

    await answer.save();

    res
    .status(200)
    .json({
        success: true,
        data: answer,
        message: "You Undoliked This Answer Successfully"
    })

}) 

const getAnswerDirectly =  expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    res
    .status(200)
    .json({
        success: true,
        data: answer,
        message: "The Answer has gotten successfully"
    })
    
})

module.exports = {
    addAnswer,
    getAnswerToQuestion,
    editAnswerToQuestion,
    deleteAnswer,
    likeAnswer,
    undolikeAnswer,
    getAnswerDirectly
}