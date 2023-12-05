const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const questionRouter = require("./questionRouter");

const indexRouter = express.Router();

indexRouter.use("/auth",authRouter);
indexRouter.use("/users",userRouter);
indexRouter.use("/admin",adminRouter)
indexRouter.use("/questions",questionRouter);

module.exports = indexRouter;