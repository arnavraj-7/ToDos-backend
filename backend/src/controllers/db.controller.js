import dotenv from 'dotenv';
import mongoose from 'mongoose'
dotenv.config();
const connectDB= async()=>{
    try{
        const connection=await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
        console.log(`Connected!:`);
    }
    catch(error){
        console.log(`Connection error:`,error);
    }
}
export default connectDB;