import { errorHandler } from "../utils/error.js";
import  Paymentmodel from '../models/razorpayModel.js'
import { instance } from "../index.js";
import crypto from 'crypto'


export const checkout = async(req,res,next)=>{

    try {
        const options = {
            amount: Number(req.body.amount),  // amount in the smallest currency unit
            currency: "INR",
            
          };
        const order = await instance.orders.create(options);
        console.log(order)
        res.status(200).json({
            success:true,order
        })
    } catch (error) {
        next(errorHandler(404, "error in chekout"))
    }


}
export const getkey = async(req,res,next)=>{
    try {
        return res.status(200).json({Key:process.env.KEY_ID})
    } catch (error) {
        next(errorHandler(404,"error in getkey"))
    }
}

export const paymentVerification = async(req,res,next)=>{
try {
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedsignature=crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
    const isauth = expectedsignature === razorpay_signature;
    if(isauth){
        await payment.create({
            razorpay_payment_id,razorpay_order_id,razorpay_signature
        })
        res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
    }
    else{
        res.status(404).json({success:false})
    }
} catch (error) {
    next(errorHandler(404, "error in paymentverification"))
}
}