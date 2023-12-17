import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";



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
  const validUser = await User.findOne({email});
  if(!validUser)return next(errorHandler(404,"User not found"));
  const validpassword= bcryptjs.compareSync(password,validUser.password);
  if(!validpassword) return next(errorHandler(401,"Invalid Password"));
  const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
//we dont want password in our response hence
const {password:pass, ...rest}= validUser._doc;
  //we want to save this token as cookie and to do that and we ussed http only so that no 3rd party can access.and can also add expiry date
  res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
 } catch (error) {
  next(error);
 }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({  
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })  
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};