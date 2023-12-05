const bcrypt = require("bcryptjs");

const sendJwtToClient = (res,user) => {

    const token = user.generateJwtFromUser();    
    
    res
    .status(200)
    .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE)  * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? false : true
    })
    .json({
        success: true,
        message: "User is Created Successfully",
        access_token: token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            title: user.title,
            place: user.place,
            website: user.website,
            about: user.about
        }
    })
}

const isTokenIncluded = (req) => {

    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");

}

const getAccessToken = (req) => {

    const authorization = req.headers.authorization;
    const token = authorization.split(" ")[1];
    return token;

}

const isEmailAndPasswordIncluded = (email,password) => {

    return email && password;

}

const comparePasswords = (password,hashPassword) => {

    return bcrypt.compareSync(password,hashPassword);
    
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessToken,
    isEmailAndPasswordIncluded,
    comparePasswords    
}