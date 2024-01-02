const express=require("express");

const app=express();
const port =4000;

app.get("/",(req,res) =>{
    res.send("hello world!");
});

//to tell express that it will run on port localhost:4000

app.listen(port,() =>{
   console.log("App is running on port:" +port);
});

