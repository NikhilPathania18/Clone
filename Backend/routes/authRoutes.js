import express from 'express'
import  {registerController}  from '../controllers/registerController.js';
import {loginController}  from '../controllers/loginController.js';
import { isEmailVerified } from '../middlewares/isEmailVerified.js';
import { verifyEmailController } from '../controllers/emailControllers.js/verifyEmailController.js';
// import upload from '../middlewares/multerMiddleware.js'
import multer from 'multer'

const upload = multer();

const router = express.Router();

router.post('/signup',upload.single('image'), registerController) 

router.post('/login', isEmailVerified, loginController)

router.get('/verify-email', verifyEmailController)


export default router;