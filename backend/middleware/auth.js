const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next)=>{
    const {token }= req.cookies;
    if(!token){
        return next(new ErrorHandler("please login to use the resources",401));
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await user.findById(decodedData.id);
    next();
});


exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
};