import mongoose from "mongoose";
import {Schema} from 'mongoose'

const TweetSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }
})

const Tweet = mongoose.model('Tweet',TweetSchema)

export default Tweet