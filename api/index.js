import  express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
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

app.listen(3000,()=>{
    console.log("Server is Running on port 3000")
});

app.use(express.json());


app.use("/api/user",userRouter)
app.use("/api/auth", authRouter); 



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