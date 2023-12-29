import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test= (req,res)=>{
    res.json({
        message:"hello fahad"
    });
}


export const updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your account'))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10)
        }
        const updatedUser =  await User.findByIdAndUpdate(req.params.id,
            {   
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar:req.body.avatar,
            }
            //it is important to write new:true so that the new changes are saaved ans wee see the ne changes   
        },
        {new: true}
        );
        const {password, ...rest}= updatedUser._doc;
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
    
};



export const deleteUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only delete your own account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted")
    } catch (error) {
        
    }
}


export const getUserListings = async(req,res,next)=>{
//we need to first check whtehr the user  belongs to this id or not hence we check

    if(req.user.id === req.params.id){
        try {
            const listing = await Listing.find({userRef:req.params.id})
            return res.status(200).json(listing)
        } catch (error) {
            next(error)
        }

    }else{
        return errorHandler(401,'You can only view your listing-getuserListings')
    }
}