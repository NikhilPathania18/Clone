import express from 'express'
import colors from 'colors'
import connectToDB from './config/database.js';
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer';
import authRoutes from './routes/authRoutes.js'
import tweetRoutes from './routes/tweetRoutes.js'
import bodyparser from 'body-parser'
import profileRoutes  from './routes/profileRoutes.js';

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();

connectToDB();

app.listen(8000,()=>{
    console.log('Server Running on 8000 port'.bgCyan.white)
})

app.use('/api',authRoutes)
app.use('/api',tweetRoutes)
app.use('/api',profileRoutes)