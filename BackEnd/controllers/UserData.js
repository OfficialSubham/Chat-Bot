import jsonwebtoken from "jsonwebtoken";
import UserData from "../data/UserSchema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //destructuring data from body
      let { name, email, username, password } = req.body;
      username = username.toLowerCase();
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
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      //destructureing the data from the body
      let { username, password } = req.body;
      username = username.toLowerCase();
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
    }
    return res.json({ errors });
  } catch (error) {
    //if any internal error occur
    res.send(500).json({ error });
  }
};

//Get all users function
export const getAllUsers = async (req, res) => {
  try {
    //.select specify the selection
    //"-" excludes the pass
    //use array to select or exclude multiple data
    let allUsers = await UserData.find().select("-password");
    res.send(allUsers);
  } catch (error) {
    //if any internal error occur
    res.sendStatus(500).json({ error });
  }
};

export const isLoggedIn = async (req, res, next) => {
  try {
    //checking token is present or not
    if(!req.headers.token) {
      //if not redirect to login
      return res.redirect("/login")
    }
    const authenticate = jsonwebtoken.verify(req.headers.token, process.env.SECRET_Key)
    if(!authenticate) {
      return res.redirect("/login")
    }
    const userDetails = await UserData.findOne({username: authenticate.username})

    req.userID = userDetails._id

    //if it has right token then redirect to work
    next()
  } catch (error) {
    //if any internal error occur
    res.sendStatus(500).json({ error });
  }
};
