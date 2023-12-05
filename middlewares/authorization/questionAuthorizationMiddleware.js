const expressAsyncHandler = require("express-async-handler");
const Question = require("../../models/Question");
const CustomError = require("../../helpers/errors/CustomError");

const checkQuestionExist = expressAsyncHandler(async (req,res,next) => {

    const question_id = req.params.id || req.params.question_id;

    const question = await Question.findById(question_id);

    if(!question){
        return next(new CustomError("There is no question with that question id",400));
    }

    next();

}) 

const checkOwnerExist = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const question = await Question.findById(id);

    if(question.userId != req.user.id){
        return next(new CustomError("You are not authorized to edit or delete this question",401));
    }

    next();

}) 

module.exports = {
    checkQuestionExist,
    checkOwnerExist
}