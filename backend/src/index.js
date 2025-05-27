import express from 'express';
import dotenv from 'dotenv';
import connectDB from './controllers/db.controller.js';
import cors from 'cors'
dotenv.config();
const app=express();
app.use(cors);
const PORT=process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,(res,req)=>{
    console.log(`Server is listening on ${PORT}`)
})
}).catch((error)=>{
    console.log(`Error occured: ${error}`);
})
