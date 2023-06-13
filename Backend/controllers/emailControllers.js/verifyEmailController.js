import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../../models/user.js'

const router = express.Router();

export const verifyEmailController = async(req,res) => {
    try {
        const token = req.params.token;
        const user = jwt.verify(token,process.env.JWT_SECRET);
        
        const existingUser = await User.findById(user._id)
        if(!existingUser)   return res.status(404).send({
            success: false,
            message: 'User Not Exists'
        })

        existingUser.isEmailVerified= true;
        existingUser.save();

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to verify Email'
        })
    }
    
    
}