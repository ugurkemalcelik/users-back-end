const { sendJwtToClient, isEmailAndPasswordIncluded, comparePasswords } = require("../helpers/authorization/authAuthorizationHelper");
const CustomError = require("../helpers/errors/CustomError");
const sendEmail = require("../helpers/libraries/sendEmail");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");
const fs = require("fs");

const register = expressAsyncHandler(async (req,res,next) => { 

    const {name,email,password,role,title,place,website,about} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role,
        title,
        place,
        website,
        about
    })

    sendJwtToClient(res,user);      

}) 

const errorTest = (req,res,next) => {

    return next(new CustomError("An Error Occured",400));

}

const getUser = (req,res,next) => {

    res
    .status(200)
    .json({
        success: true,
        message: "Connecting to user is SuccessFul",
        data: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role,
            title: req.user.title,
            place: req.user.place,
            website: req.user.website,
            about: req.user.about
        }
    })
}

const login = expressAsyncHandler(async (req,res,next) => {

    const {email,password} = req.body;

    if(!isEmailAndPasswordIncluded(email,password)){
        return next(new CustomError("Please check your inputs",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }

    if(!comparePasswords(password,user.password)){
        return next(new CustomError("Please check your credentials",400));
    }

    sendJwtToClient(res,user);

}) 

const logout = expressAsyncHandler(async (req,res,next) => {

    res
    .status(200)
    .cookie({
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        expires: Date.now()
    })
    .json({
        success: true,
        message: "Logout Process is Successfull"
    })
    
}) 

const uploadImage = expressAsyncHandler(async (req,res,next) => {

    const {base64Image} = req.body;

    const user = await User.findByIdAndUpdate(req.user.id,{
        profile_image: req.savedProfileImage                 
    },{
        new: true,
        runValidators: true
    })

    user.avatar = base64Image;

    console.log(base64Image);

    await user.save();
    
    res
    .status(200)
    .json({
        success: true,
        message: "Profile Image Upload Process is Successfull",
        data: user
    })

}) 

const forgotPassword = expressAsyncHandler(async (req,res,next) => {

    const {email} = req.body;

    if(!email){
        return next(new CustomError("Please provide a reset password email",400));
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser();

    await user.save();    

    const htmlTemplate = `
        <h3>Reset Your Password</h3>
        <p>This is your reset password token = ${resetPasswordToken} will expire in 1 hour</p>    
    `;

    try {

        sendEmail({
            from: process.env.SMTP_USER,
            to: `${email}`,
            html: htmlTemplate,
            subject: "Reset Your Password"
        })

        res
        .status(200)
        .json({
            success: true,
            message: "Email has been sent"
        })

    } catch (err) {
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return next(new CustomError("Email could not be sent",400));
    }

}) 

const resetPassword = expressAsyncHandler(async (req,res,next) => {

    const {password} = req.body;

    const {resetPasswordToken} = req.query;

    if(!resetPasswordToken){
        return next(new CustomError("Please provide a valid token",400));
    }

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new CustomError("Invalid token or session expired",400));
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res
    .status(200)
    .json({
        success: true,
        message: "Reset Password Process is Successfull"
    })
    
}) 

const editUser = expressAsyncHandler(async (req,res,next) => {      

    const updatePart = req.body;

    const user = await User.findByIdAndUpdate(req.user.id,updatePart,{
        new: true,
        runValidators: true
    })   

    res
    .status(200)
    .json({
        success: true,
        message: "The User is Edited successfully",
        data: user
    })
}) 

const getPhoto = expressAsyncHandler(async (req,res,next) => {

    const {profile_image} = req.params;     

    res
    .status(200)
    .json({
        data: `http://localhost:5000/uploads/${profile_image}`
    })   

})

module.exports = {
    register,
    errorTest,
    getUser,
    login,
    uploadImage,
    forgotPassword,
    resetPassword,
    editUser,
    logout,
    getPhoto    
}