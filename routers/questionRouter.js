const express = require("express");
const { addQuestion, getAllQuestion, editQuestion, deleteQuestion, like, undolike, getSingleQuestion } = require("../controllers/questionController");
const { getAccessToRoute } = require("../middlewares/authorization/authAuthorizationMiddleware");
const { checkQuestionExist, checkOwnerExist } = require("../middlewares/authorization/questionAuthorizationMiddleware");
const answerRouter = require("./answerRouter");

const questionRouter = express.Router();

questionRouter.post("/add",getAccessToRoute,addQuestion);
questionRouter.get("/",getAccessToRoute,getAllQuestion);
questionRouter.get("/:id",checkQuestionExist,getSingleQuestion);
questionRouter.put("/edit/:id",checkQuestionExist,getAccessToRoute,checkOwnerExist,editQuestion);
questionRouter.delete("/delete/:id",checkQuestionExist,getAccessToRoute,checkOwnerExist,deleteQuestion);
questionRouter.put("/like/:id",checkQuestionExist,getAccessToRoute,like);
questionRouter.put("/undolike/:id",checkQuestionExist,getAccessToRoute,undolike);
questionRouter.use("/:question_id/answers",checkQuestionExist,answerRouter);

module.exports = questionRouter;