import express from 'express'
import { profileController } from '../controllers/profileController.js/profileController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { myProfileController } from '../controllers/profileController.js/myProfileController.js';

const router = express.Router();

router.get('/profile', isLoggedIn, myProfileController)
router.get('/profile/:id', profileController)

export default router