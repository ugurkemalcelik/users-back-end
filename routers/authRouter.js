const express = require("express");
const { register, errorTest, getUser, login, uploadImage, forgotPassword, resetPassword, editUser, logout, getPhoto } = require("../controllers/authController");
const { getAccessToRoute } = require("../middlewares/authorization/authAuthorizationMiddleware");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.get("/error",errorTest);
authRouter.get("/profile",getAccessToRoute,getUser);
authRouter.post("/login",login);
authRouter.get("/logout",getAccessToRoute,logout);
authRouter.post("/upload",getAccessToRoute,profileImageUpload.single("profile_image"),uploadImage);
authRouter.post("/forgotpassword",forgotPassword);
authRouter.post("/resetpassword",resetPassword);
authRouter.put("/edit/:id",getAccessToRoute,editUser);
authRouter.get("/upload/:profile_image",getPhoto);

module.exports = authRouter;