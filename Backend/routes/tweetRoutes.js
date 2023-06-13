import express from 'express'
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { deleteTweetController } from '../controllers/tweetControllers/deleteTweetController.js';
import { createTweetController } from '../controllers/tweetControllers/createTweetController.js';
import { editTweetController } from '../controllers/tweetControllers/editTweetController.js';
import { fetchTweets } from '../controllers/tweetControllers/fetchTweets.js';
import { getTweetDetails } from '../controllers/tweetControllers/getTweetController.js';

const router = express.Router();

router.get('/fetch-tweets',fetchTweets)

router.get('/get-tweet/:id',getTweetDetails)

router.post('/create-tweet',isLoggedIn,createTweetController);

router.patch('/edit-tweet',isLoggedIn,editTweetController)

router.delete('/delete-tweet/:id',isLoggedIn,deleteTweetController)

export default router