import  express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import listingRouter from './routes/listingRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
import cookieParser from "cookie-parser";
import  path from 'path'
import Razorpay from "razorpay";
import cors from 'cors'
import crypto from 'crypto'
dotenv.config();

//install razorpay and instantiate 
export const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET,
  });



mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());



app.use("/api/user",userRouter)
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/payment", paymentRouter)


app.use(express.static(path.join(__dirname,'/client/dist')))

//any route that excledes the above 3 is going to be directed to index.html
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

app.listen(3000,()=>{
    console.log("Server is Running on port 3000")
});


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


