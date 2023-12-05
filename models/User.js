const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name :{
        type: String,
        required: [true,"Please provide a name"],
        minLength: [2,"Please provide a name with minLength 2 characters"]
    },
    email: {
        type: String,
        required: [true,"Please provide an email"],
        match: [
            /^[a-z_][a-z_0-9.]+@[a-z_0-9.]+\w[^A-Z_0-9]$/,
            "Please provide an email that match email writing rules"
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true,"Please provide a password"],
        minLength: [6,"Please provide a password with minLength 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["user","admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    blocked: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    place: {
        type: String
    },
    website: {
        type: String
    },
    profile_image: {
        type: String,
        default: "default.jpg"        
    },
    avatar: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }


})

UserSchema.methods.generateJwtFromUser = function(){

    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        title: this.title,
        place: this.place,
        website: this.website,
        about: this.about
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })

    return token;

}

UserSchema.methods.getResetPasswordTokenFromUser = function(){

    const randomHexString = crypto.randomBytes(15).toString("hex");

    const resetPasswordToken = crypto
    .createHash("SHA256")
    .update(randomHexString)
    .digest("hex")

    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpire = new Date(Date.now() + parseInt(process.env.RESET_PASSWORD_EXPIRE) * 1000 * 60 * 60);

    return resetPasswordToken;

}

UserSchema.pre("save",function(next){

    if(!this.isModified("password")){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {

        if(err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {

            if(err) next(err);

            this.password = hash;

            next();
            
        });
    });
})

module.exports = mongoose.model("User",UserSchema);