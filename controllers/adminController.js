const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const blockUser = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    const user = await User.findById(id);

    user.blocked = !user.blocked;

    user.save();

    res
    .status(200)
    .json({
        success: true,
        message: "Blocked-Unblocked user is successfull",
        data: user
    })
    
}) 

const deleteUser = expressAsyncHandler(async (req,res,next) => {

    const {id} = req.params;

    await User.findByIdAndRemove({_id:id});   

    res
    .status(200)
    .json({
        success: true,
        message: "Deleting user is successfull"
    })

}) 

module.exports = {
    blockUser,
    deleteUser
}