import express from 'express';
import { github, google, phoneNumbers, signin, signout, signup} from "../controllers/authConroller.js";



const router = express.Router();


router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.post("/github",github);
router.get('/signout',signout);
router.post('/phoneNumbers',phoneNumbers);

export default router;
