const express=require("express");
const mongoose=require('mongoose');
const punycode=require('punycode');
const app=express();
require("dotenv").config();
const port =4000;
//connect mongo to node
//two steps
//from which db and connection options
mongoose.connect("mongodb+srv://ananyashenoy62:"+ process.env.Mongo_password +"@cluster0.mj69tna.mongodb.net/?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then((x)=>{
    console.log("connected")
})
.catch((err)=>{
    console.log("error whhile connecting")
})
app.get("/",(req,res) =>{
    res.send("hello world!");
});

//to tell express that it will run on port localhost:4000

app.listen(port,() =>{
   console.log("App is running on port:" +port);
});

