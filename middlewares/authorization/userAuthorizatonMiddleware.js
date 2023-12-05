const expressAsyncHandler = require("express-async-handler");
const User = require("../../models/User");
const CustomError = require("../../helpers/errors/CustomError");

const checkUserExist = expressAsyncHandler(async(req,res,next) => {

    const {id} = req.params;    

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("There is no user with that email",400));
    }

    next();

}) 

module.exports = {
    checkUserExist
}