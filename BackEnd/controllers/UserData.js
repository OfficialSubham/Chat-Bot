import jsonwebtoken from "jsonwebtoken";
import UserData from "../data/UserSchema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //destructuring data from body
      const { name, email, username, password } = req.body;

      //checking if the user is already existed
      const usernameExisted = await UserData.findOne({ username });
      const emailExisted = await UserData.findOne({ email });
      const hashedPass = bcrypt.hashSync(password, 10);
      //if not existed then create the user
      if (!usernameExisted && !emailExisted) {
        await UserData.create({
          name,
          email,
          username,
          password: hashedPass,
        });
        //giving jwt token for using in the website
        const payload = {
          //payload contains the info of the users in the token
          email,
          username,
        };
        const jwtToken = jsonwebtoken.sign(payload, process.env.SECRET_Key);
        return res.json({ token: jwtToken });
      }
      //if user existed with that info then giving the below message
      return res.json({ message: "Username or Email is already taken" });
    }
    return res.send(errors);
  } catch (error) {
    //500 of any internal error occurs
    res.send(500).json({ error });
  }
};

//creating login user function
export const loginUser = async (req, res) => {
  try {
    //destructureing the data from the body
    const { username, password } = req.body;

    //finding the user in database
    const user = await UserData.findOne({ username });
    if (!user) {
      //if user doesnot exist
      return res.send("User doesn't exist");
    }
    //if exist checking the pass
    const passCorrect = bcrypt.compareSync(password, user.password);
    if (passCorrect) {
      //if pass is correct giving the user the token
      const payload = {
        //payload contains the info of the users in the token
        email: user.email,
        username: user.username,
      };
      const jwtToken = jsonwebtoken.sign(payload, process.env.SECRET_Key);
      return res.json({ token: jwtToken });
    }
    //if pass not match giving message
    return res.json({ message: "Password Incorrect" });
  } catch (error) {
    //if any internal error occur
    res.send(500).json({ error });
  }
};

export const getAllUsers = (req, res) => {
  try {
    let allUsers = UserData.find()
  } catch (error) {
    //if any internal error occur
    res.send(500).json({ error });
  }
};
