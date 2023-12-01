import { signup } from "../controllers/authConroller.js";
import express from 'express';



const router = express.Router();


router.post("/signup",signup)

export default router;
