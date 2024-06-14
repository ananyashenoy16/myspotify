const express =require("express")
const router= express.Router();
const bcrypt=require("bcrypt");
const {getToken} = require ("../utils/helpers")
const User=require("../models/User");
router.post("/register",async (req,res) =>{
 const {email,password,firstName,lastName,username} = req.body;

 const user= await User.findOne({email:email});
 //step 2:check whteher already exists

 if(user){
    return res.status(403).json({error:"user with this email already exisits"});
 }
//  else if(user==0){
//     return res.status(402).json({error:"no user found"});
//  }
 //step3:create a new user
 //step3.1:we cannot store passwords in plain text

//  const hashedPassword=bcrypt.hash(password,10);
//  password:hashedPassword
 const newUserData =  {email,password,firstName,lastName,username};

 const newUser = await User.create(newUserData);

 //step4:we want to create a token to return to user
 const token= await getToken(email,newUser);

 //step5:
 const userToReturn ={...newUser.toJSON(),token};
 delete userToReturn.password;
 return res.status(200).json(userToReturn);
});

router.post("/login",async (req,res) =>{

//step1:get email and password sent by user from req.body

const{email,password}= req.body;
//step2:check whether user with same email already exisis
const user=await User.findOne({email:email});
if(!user){
   return res.status(403).json({err:"invalid credentials"});
}
//step3:if user exists check password is correct else invalid
 if(password!=user.password){
   return res.status(403).json({err:"invalid credentials"});
}

//step 4:if its correct return token
const token = await getToken(user.email,user);
const userToReturn ={...user.toJSON(),token};
// delete userToReturn.password;
return res.status(200).json(userToReturn);
});

module.exports=router;