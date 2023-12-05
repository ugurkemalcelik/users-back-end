const CustomError = require("../../helpers/errors/CustomError");

const customErrorHandler = (err,req,res,next) => {

    let customError = {
        message: undefined,
        status: undefined
    }

    console.log(err.message)

    if(err.name === "Error" && err.status === undefined ){
        customError = new CustomError(err.message,400);
    } else if(err.name === "Error" && err.status === 400){
        customError = new CustomError(err.message,400);
    } else if(err.name === "Error" && err.status === 401){
        customError = new CustomError(err.message,401);
    } else if(err.name === "Error" && err.status === 402){
        customError = new CustomError(err.message,402);
    } else if(err.name === "Error" && err.status === 403){
        customError = new CustomError(err.message,403);
    } else if(err.name === "Error" && err.status === 404){
        customError = new CustomError(err.message,404);
    }

    if(err.name === "TypeError"){
        customError = new CustomError(err.message,400);
    }

    if(err.name === "SyntaxError"){
        customError = new CustomError(err.message,400);
    }

    if(err.name === "ValidationError"){
        customError = new CustomError(err.message,400);
    }

    if(err.code === 11000){
        customError = new CustomError("Duplicate key occured, please provide a different email",400);
    }

    if(err.name === "CastError"){
        customError = new CustomError("Please provide an id that match MongoDb id rules",400);
    }

    res
    .status(customError.status || 500)
    .json({
        success: false,
        message: customError.message || "Internal Server Error"
    })
}

module.exports = customErrorHandler;