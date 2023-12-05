const expressAsyncHandler = require("express-async-handler")
const User = require("../../models/User");
const CustomError = require("../../helpers/errors/CustomError");

const checkAdminExist = expressAsyncHandler(async (req,res,next) => {

    const user = await User.findById(req.user.id);    

    if(user.role !== "admin"){
        return next(new CustomError("Only admins access this route",401));
    }

    next();
    
}) 

module.exports = {
    checkAdminExist
}