import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User',UserSchema)

export default User;