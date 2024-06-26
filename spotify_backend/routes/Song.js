const express =require("express");
const passport = require("passport");
const router=express.Router();
const Song =require("../models/Song")
const User=require("../models/User")

//req.user gets the user because of passport.authenticate
router.post("/create", passport.authenticate("jwt",{session:false}),async(req,res) =>{
    const{name ,thumbnail,track} = req.body;
    if(!name || !thumbnail || !track){
        return res.status(301).json({err:"Insufficient details to create song"});
    }
    const artist =req.user._id;
    const songDetails = {name,thumbnail,track,artist};
    const createdSong =await Song.create(songDetails);
    return res.status(200).json(createdSong);
});

router.get("/get/mysongs",passport.authenticate("jwt",{session:false}),
 async (req,res)=>{
   const currentUser =req.user;
   const songs=await Song.find({artist:req.user._id});
   return res.status(200).json({data: songs})
 }
);
router.get("/get/artist/:artistId",passport.authenticate("jwt",{session:false}),
 async(req,res) =>{
    const {artistId}=req.params;
    const artist=await User.find({_id:artistId});
    if(!artist){
        return res.status(301).json({err:"artist does not exists"})
    }
    const songs=await Song.find({artist:artistId});
    return res.status(200).json({data:songs});
 }
);

router.get("get/songname/:songname",passport.authenticate("jwt",{session:false}),
   async(req,res) =>{
    const {songName}=req.params;
    const songs=await Song.find({name:songName});
    return res.status(200).json({data:songs});
   }
)

module.exports= router;