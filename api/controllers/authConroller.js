import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import Jwt from "jsonwebtoken";


export const signup= async(req,res,next)=>{
//we want information from broswer and this is coming from body req.body is the information we get from browser
const { username, email, password } = req.body;
const hashedPassword = bcryptjs.hashSync(password, 10);
const newUser = new User({ username, email, password: hashedPassword });
try {
  await newUser.save();
  res.status(201).json('User created successfully!');
} catch (error) {
  next(error);
}
};


export const signin=async(req,res,next)=>{
 const {email,password}=req.body;
 try {
  const validuser = await User.findOne({email});
  if(!validuser)return next(errorHandler(404,"Invalid Credentials"));
  const validpassword= bcryptjs.compareSync(password,validuser.password);
  if(!validpassword) return next(errorHandler(401,"Invalid Password"));
  const token = Jwt.sign({id:validuser._id},process.env.JWT_SECRET);
//we dont want password in our response hence
const {password:pass, ...rest}= validuser._doc;


  //we want to save this token as cookie and to do that and we ussed http only so that no 3rd party can access.and can also add expiry date
  res.cookie('access_token',token,{httpOnly:true}).status(200).json({rest})
 } catch (error) {
  next(error);
 }
}