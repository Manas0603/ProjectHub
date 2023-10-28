import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
const router = express.Router();
import bcrypt from "bcrypt";
import Token from "../model/token.js";
import { uploadImage } from "../controller/image-controller.js";
import jwt from "jsonwebtoken";
import upload from "../utils/upload.js";
import User from "../model/user.js";
import dotenv from "dotenv";
dotenv.config();

// router.post('/login',loginUser);
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const store = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const setDetail = await store.save();
    res.send(true);
  } catch (err) {
    console.log(`error in singup backend : ${err}`);
    res.send(false);
  }
});

router.post("/login", async (request, response) => {
  console.log(request.body.logEmail);
  let user = await User.findOne({ email: request.body.logEmail });
  console.log(user);
  if (!user) {
    return response.status(400).json({ 
        msg: "email does not match" });
  } else {
    try {
      let match = await bcrypt.compare(request.body.logPassword, user.password);
      console.log(match);
      if (match) {
        const accessToken = jwt.sign(
          user.toJSON(),
          process.env.ACCESS_SECRET_KEY
        );
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_SECRET_KEY
        );

        const newToken = new Token({
          token: refreshToken,
        });
        await newToken.save();

        return response.status(200).json({
          accessToken: accessToken,
          refrshToken: refreshToken,
          name: user.name,
          email: user.email,
        });
      } else {
        return response.status(400).json({
          msg: "password does not match",
        });
      }
    } catch (error) {
      return response.status(500).json({
        msg: error,
      });
    }
  }
});

// router.post('/file/upload',upload.single('file')uploadImage)

export default router;
