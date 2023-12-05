const expressAsyncHandler = require("express-async-handler");
const Answer = require("../../models/Answer");
const CustomError = require("../../helpers/errors/CustomError");

const checkAnswerExist = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    if(!answer){
        return next(new CustomError("There is no answer with that answer id",400));
    }

    next();

}) 

const checkAnswerOwnerExist = expressAsyncHandler(async (req,res,next) => {

    const {answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    if(answer.userId != req.user.id){
        return next(new CustomError("You are not authorized to access this route",401));
    }

    next();
    
}) 

module.exports = {
    checkAnswerExist,
    checkAnswerOwnerExist
}