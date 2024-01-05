
import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";
import { request } from "express";

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

export const getListings = async(req,res,next)=>{
  try {
    const limit = parseInt(req.query.limit) || 9;
    //if there is not start index we use 0
    const startIndex = parseInt(req.query.startIndex) || 0;
     let offer = req.query.offer;
    //the offer can be true or false or undefined ans in starting we need it to be falsse
    if(offer === 'false' || offer ===undefined ){
      offer={$in:[false,true] };
    }

    let furnished = req.query.furnished;
    if(furnished==='false' || furnished===undefined)
    {
      furnished = {$in:[false,true]};
    }
    let parking = req.query.parking;
    if(parking==='false' || parking===undefined)
    {
      parking = {$in:[false,true]};
    }

    let type=req.query.type ;
    if(type==='all'|| type===undefined){
      type= {$in:['sale','rent']};
    } 

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings =  await Listing.find({
      //regex is like i f you have some tittle it will search for the term it is built in search functionality in monogDB
      //${option :i is for not diffrentitating bitween upper case and lower case}
      name: { $regex:searchTerm,  $options:'i'},
      offer,
      type,
      furnished,
      parking 
    }).sort(
      {[sort]:order}
    ).limit(limit).skip(startIndex);


    return res.status(200).json(listings)



  } catch (error) {
    next(error);
  }
}