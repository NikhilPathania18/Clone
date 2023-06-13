import User from "../models/user.js";
import { comparePasswword } from "../helpers/encrypt.js";
import jwt from 'jsonwebtoken'

export const loginController = async(req,res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user)   return res.status(200).send({
        success: false,
        message: 'User Not found'
    })

    if(!comparePasswword(password,user.password))   return res.status(200).send({
        succes: false,
        message: 'Invalid credentials'
    })

    
  jwt.sign({user},process.env.JWT_SECRET,(err,token) => {
    if(err){
        return res.status(500).send({
            success: false,
            message: 'Error while generating the token'
        })
    }
    else{
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token,
            user
        })
    }
  })
}