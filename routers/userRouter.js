const express = require("express");
const { getUsers, getSingleUser } = require("../controllers/userController");
const { checkUserExist } = require("../middlewares/authorization/userAuthorizatonMiddleware");
const { getAccessToRoute } = require("../middlewares/authorization/authAuthorizationMiddleware");

const userRouter = express.Router();

userRouter.get("/",getAccessToRoute,getUsers);
userRouter.get("/:id",checkUserExist,getSingleUser);

module.exports = userRouter;