import User from "../models/user.js";

export const isEmailVerified = async(req,res,next) => {
    const {email} = req.body;
    const user =await User.findOne({email});
    if(!user)   return res.status(200).send({
        success: false,
        message: "User Not registered"
    })
    if(!user.isEmailVerified)   return res.status(200).send({
        success: false,
        message: "You need to verify your email first"
    })
    next();
}