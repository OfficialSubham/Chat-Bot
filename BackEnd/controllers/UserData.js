import jsonwebtoken from "jsonwebtoken";
import UserData from "../data/UserSchema.js";

export const registerUser = async (req, res) => {
  try {
    //destructuring data from body
    const { name, email, username } = req.body;

    //checking if the user is already existed
    const usernameExisted = await UserData.findOne({ username });
    const emailExisted = await UserData.findOne({ email });

    //if not existed then create the user
    if (!usernameExisted && !emailExisted) {
    await UserData.create({
        name,
        email,
        username,
      });
      //giving jwt token for using in the website
      const payload = {
        //payload contains the info of the users in the token
        email,
        username
      }
      const jwtToken = jsonwebtoken.sign(payload, process.env.SECRET_Key)
      return res.json({token: jwtToken});
    }
    //if user existed with that info then giving the below message
    return res.json({ message: "Username or Email is already taken" });
  } catch (error) {
    //500 of any internal error occurs
    res.send(500).json({ error });
  }
};
