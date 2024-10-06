import express from "express"
import {registerUser} from "../controllers/UserData.js"
let router = express.Router();


/* GET users listing. */
router.post('/register', registerUser);

export default router;
