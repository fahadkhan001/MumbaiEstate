import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";


export const signup= async(req,res,next)=>{
//we want information from broswer and this is coming from body req.body is the information we get from browser
const {username,email,password}=req.body;
const hashedPassword = bcryptjs.hashSync(password,10);
const newUser= new User({username,email,password:hashedPassword});
try{


await newUser.save();
res.status(201).json("User created succesfully!!!")
}
catch(error){
    next(error);
}

}