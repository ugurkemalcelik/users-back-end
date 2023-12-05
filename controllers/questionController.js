const expressAsyncHandler = require("express-async-handler");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const CustomError = require("../helpers/errors/CustomError");
const slugify = require ("slugify");

const addQuestion = expressAsyncHandler(async (req,res,next) => {

    const {title,content} = req.body;

    const question = await Question.create({
        title,
        content,
        userId: req.user.id,
        questionOwnerName: req.user.name
    })    

    question.slug = slugify(question.title, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true
    })

    question.save();

    res
    .status(200)
    .json({
        success: true,
        message: "Question is created successfully",
        data: question
    })

}) 

const getAllQuestion = expressAsyncHandler(async (req,res,next) => {

    const questions = await Question.find();

    res
    .status(200)
    .json({
        success: true,
        data: questions,
        message: "The Questions have gotten successfully"
    })

}) 

const editQuestion = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const {title,content} = req.body;

    const question = await Question.findById(id);
    
    if(question.title === title){
        question.slug = question.slug;
    } else {

        question.slug = slugify(title, {
            replacement: '-',  
            remove: /[*+~.()'"!:@]/g, 
            lower: true
        })        
    }

    question.title = title;
    question.content = content;

    question.save();

    res
    .status(200)
    .json({
        success: true,
        data: question,
        message: "Edit Question is Successfull"
    })

}) 

const deleteQuestion = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const question = await Question.findByIdAndDelete({_id:id});

    await Answer.deleteMany({
        questionId: id
    })

    res
    .status(200)
    .json({
        success: true,
        message: "Delete Question and Answer/Answers depend on Question is Successful",
        data: question
    })

})

const like = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const question = await Question.findById(id);

    if(question.likes.includes(req.user.id)){
        return next(new CustomError("You are already like this question",400));
    } 

    question.likes.push(req.user.id);

    await question.save();

    res
    .status(200)
    .json({
        success: true,
        data: question,
        message: "You have liked this question successfully"
    })

}) 

const undolike = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const question = await Question.findById(id);

    if(!question.likes.includes(req.user.id)){
        return next(new CustomError("You don't like this question before",400)); 
    }

    const index = question.likes.indexOf(req.user.id);
    question.likes.splice(index,1);

    await question.save();

    res
    .status(200)
    .json({
        success: true,
        data: question,
        message: "You have undo liked this question successfully"
    })

}) 

const getSingleQuestion = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    console.log(id)

    const question = await Question.findById(id);

    res
    .status(200)
    .json({
        success: true,
        message: "Get Single Question Process is Successfull",
        data: question
    })

}) 

module.exports = {
    addQuestion,
    getAllQuestion,
    editQuestion,
    deleteQuestion,
    like,
    undolike,
    getSingleQuestion
}