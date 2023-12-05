const express = require("express");
const { addAnswer, getAnswerToQuestion, editAnswerToQuestion, deleteAnswer, likeAnswer, undolikeAnswer, getAnswerDirectly } = require("../controllers/answerController");
const { getAccessToRoute } = require("../middlewares/authorization/authAuthorizationMiddleware");
const { checkAnswerExist, checkAnswerOwnerExist } = require("../middlewares/authorization/answerAuthorizationMiddleware");

const answerRouter = express.Router({mergeParams:true});

answerRouter.post("/add",getAccessToRoute,addAnswer);
answerRouter.get("/",getAccessToRoute,getAnswerToQuestion);
answerRouter.put("/edit/:answer_id",getAccessToRoute,checkAnswerExist,checkAnswerOwnerExist,editAnswerToQuestion);
answerRouter.delete("/delete/:answer_id",getAccessToRoute,checkAnswerExist,checkAnswerOwnerExist,deleteAnswer);
answerRouter.put("/like/:answer_id",getAccessToRoute,checkAnswerExist,likeAnswer);
answerRouter.put("/undolike/:answer_id",getAccessToRoute,checkAnswerExist,undolikeAnswer);
answerRouter.get("/:answer_id",getAccessToRoute,checkAnswerExist,getAnswerDirectly);

module.exports = answerRouter;