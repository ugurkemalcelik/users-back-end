const { isTokenIncluded, getAccessToken } = require("../../helpers/authorization/authAuthorizationHelper");
const CustomError = require("../../helpers/errors/CustomError");
const jwt = require("jsonwebtoken");

const getAccessToRoute = (req,res,next) => {

    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route",401));
    }

    const token = getAccessToken(req);
    

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decoded) => {

        if(err){
            return next(new CustomError("You are not authorized to access this route",401));
        }

        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
            title: decoded.title,
            place: decoded.place,
            website: decoded.website,
            about: decoded.about
        }        

        return next();

    })

}

module.exports = {
    getAccessToRoute
}