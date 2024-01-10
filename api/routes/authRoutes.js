import express from 'express';
import { google, phoneNumbers, signin, signout, signup} from "../controllers/authConroller.js";



const router = express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.get('/signout',signout);
router.post('/phoneNumbers',phoneNumbers);

export default router;
