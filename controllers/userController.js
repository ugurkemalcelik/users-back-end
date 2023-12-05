const expressAsyncHandler = require("express-async-handler")
const User = require("../models/User")

const getUsers = expressAsyncHandler(async (req,res,next) => {

    const users = await User.find();
    
    res
    .status(200)
    .json({
        success: true,
        data: users
    })

}) 

const getSingleUser = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const user = await User.findById(id);

    res
    .status(200)
    .json({
        success: true,
        data: user
    })
    
}) 

module.exports = {
    getUsers,
    getSingleUser
}