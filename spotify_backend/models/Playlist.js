const mongoose = require("mongoose");
//require mongoose
//create mongoose schema
//create a model

const Playlist = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, //hence we use url
    required: true,
  },
  Owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  songs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "song",
    },
  ],
  collborators: [
    {
      type: mongoose.Types.ObjectId,
      ref:"user",
    },
  ],
});
const PlaylistModel = mongoose.model("Playlist", Playlist);

module.exports = PlaylistModel;
