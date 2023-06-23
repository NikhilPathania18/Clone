import User from "../models/user.js"
import { hashPassword } from "../helpers/encrypt.js";
import uploadFile from '../middlewares/awsMiddleware.js'
  
export const registerController = async(req,res) =>{
    const {username, name, email, password} = req.body;


    if(!username)   return res.status(422).send({
        success: false,
        message: 'UserName is required'
    })
    
    if(!name)   return res.status(422).send({
        success: false,
        message: 'Name is required'
    })

    if(!email)  return res.status(422).send({
        success: false,
        message: 'Email is required'
    })

    if(!password)   return res.status(422).send({
        success: false,
        message: 'Password is required'
    })




    // check if user already exists
    const user = await User.findOne({username})

    if(user)    return res.status(400).send({
        success: false,
        message: 'Username is already taken, Choose another one'
    })


    // check if email is already taken
    const isEmailTaken = await User.findOne({email})

    if(isEmailTaken)    return res.status(400).send({
        success: false,
        message: 'Email is already registered'
    })


    const hashedPassword = await hashPassword(password)   //encrypting the password

    //upload file to aws and get image link
    let profilePhoto
    let file = req.file;
    if(!file)
    return res.status(200).send({
        success: false,
        message: 'Profile Photo is required'
    })

    file.originalname = username
    try {
        const imageUrl = await uploadFile(file);
        profilePhoto = imageUrl;
    } catch (error) {
        console.log('Error',error)
    }

    try {

        await new User({
            username,
            name,
            email,
            password: hashedPassword,
            profilePhoto,
        }).save();

        return res.status(200).send({
            success: true,
            message: 'User Created'
        })

    } catch (error) {
        
        console.log(error.message)
        return res.status(500).send({
            success: false,
            message: 'Error in Registration'
        })
    }

}