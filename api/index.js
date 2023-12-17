import  express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import listingRouter from './routes/listingRoutes.js'
import cookieParser from "cookie-parser";
dotenv.config();


mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});


const app = express();
app.use(express.json())

app.use(cookieParser());

app.listen(3000,()=>{
    console.log("Server is Running on port 3000")
});



app.use("/api/user",userRouter)
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


//middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message||'Internal server Error index.js'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});