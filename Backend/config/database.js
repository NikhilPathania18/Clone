import mongoose, { mongo } from "mongoose";

const connectToDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to DataBase'.bgGreen.white)
        return true;
    }catch(err){
        console.log('Error Connecting to Database'.bgRed.white);
        console.log(err.message);
        return false
    }
}

export default connectToDB;