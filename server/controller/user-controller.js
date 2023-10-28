// user-controller.js
import bcrypt from 'bcrypt';
import Token from '../model/token.js';
import  jwt  from 'jsonwebtoken';
import User from "../model/user.js";
import dotenv from 'dotenv'
dotenv.config();


export const signupUser = async(request, response) => {
    try {
       
        const hashedPassword= await bcrypt.hash(request.body.password,10);  
        const user = {email:request.body.email,name:request.body.name,password:hashedPassword}
        const newUser= new User(user);
        await newUser.save();

        return response.status(200).json({msg:'signup succesful'})
        // Your implementation here
    } catch (error) {
        // Handle errors
        return response.status(500).json({msg: 'while signup the user'})
    }
};


export const loginUser=async(request,response)=>{
    
    let user=await User.findOne({email:request.body.email});
    if(!user){
       return response.status(400).json ({msg:'email does not match'}) ;
    }
    try {
        await bcrypt.compare(request.body.password,user.email);
        if(match){
           const accessToken=jwt.sign(user.toJSON(),process.env.Access_Secret_key,{expireIn:'15m'})
           const refreshToken=jwt.sign(user.toJSON(),process.env.Refresh_Secret_key);
           

          const newToken= newToken({token:refreshToken})
          await newToken.save();

          return response.status(200).json({accessToken:accessToken,refrshToken:refreshToken,name:user.name,email:user.email})
        }
        else{
           return response.status(400).json({msg:"password does not match"})
        }
    } catch (error) {
        return response.status(500).json({msg:'Error while login in'})
    }
}


