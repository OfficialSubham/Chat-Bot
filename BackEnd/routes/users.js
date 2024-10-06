import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/UserData.js";
import { body } from "express-validator";
let router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("username").isLength({ min: 2 }),
    body("password").isLength({ min: 2 }),
  ],
  loginUser
);

router.get("/allusers", getAllUsers);

export default router;
