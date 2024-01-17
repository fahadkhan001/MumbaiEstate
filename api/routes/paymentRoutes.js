import express from 'express'
import {checkout, getkey, paymentVerification } from '../controllers/paymentController.js';



const router = express.Router();

router.post('/checkout',checkout)
router.get('/getkey', getkey)
router.post('/verification', paymentVerification)

export default router;