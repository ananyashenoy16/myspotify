const mongoose=require("mongoose");
//require mongoose
//create mongoose schema
//create a model

const Song = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String, //hence we use url
        required:true,
    },
    track:{
        type:String,
        required:true,
    },
    artist:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
});
const SongModel= mongoose.model("Song",Song);

module.exports=SongModel;