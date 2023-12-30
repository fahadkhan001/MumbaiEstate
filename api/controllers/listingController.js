import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing=async(req,res,next)=>{
    try {
        const listing =  await Listing.create(req.body);
        return  res.status(201).json(listing);
    } catch (error) {
        next(error)
    }
} 


export const deleteListing = async(req,res,next)=>{

    const listing =  await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found'))
    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'Ypu can change your listings only'))

    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing has been deleted')
    } catch (error) {
        next(error)
    }
}



export const updateListing = async (req, res, next) => {
        //we need to check wether listing exist or not
    const listing = await Listing.findById(req.params.id);
        //we check if listing exists or not
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
      //checking listing belong to that person or not
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };


  export const  getListing = async(req,res,next)=>{
    try {
        const listing  = await Listing.findById(req.params.id);
        if(!listing)return  next(errorHandler(404,'Listing not found'))
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
  }