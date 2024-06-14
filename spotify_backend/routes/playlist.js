const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

// Create a playlist
router.post("/create", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs) {
        return res.status(400).json({ err: "Insufficient data" });
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: []
    };
    try {
        const playlist = await Playlist.create(playlistData);
        return res.status(200).json(playlist);
    } catch (error) {
        return res.status(500).json({ err: "Failed to create playlist" });
    }
});

// Get a playlist by ID
router.get("/get/playlist/:playlistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const playlistId = req.params.playlistId;
    try {
        const playlist = await Playlist.findOne({ _id: playlistId });
        if (!playlist) {
            return res.status(400).json({ err: "Invalid ID" });
        }
        return res.status(200).json(playlist);
    } catch (error) {
        return res.status(500).json({ err: "Failed to get playlist" });
    }
});

// Get all playlists made by an artist
router.get("/get/artist/:artistId", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const artistId = req.params.artistId;
    try {
        const artist = await User.findOne({ _id: artistId });
        if (!artist ) {
            return res.status(400).json({ err: "Artist does not exist" });
        }
        const playlists = await Playlist.find({ owner: artistId });
        return res.status(200).json({ data: playlists });
    } catch (error) {
        return res.status(500).json({ err: "Failed to get playlists" });
    }
});

// Add a song to a playlist
router.post("/add/song", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;
    try {
        const playlist = await Playlist.findOne({ _id: playlistId });
        if (!playlist) {
            return res.status(400).json({ err: "Playlist does not exist" });
        }
        if (!playlist.Owner.equals( currentUser._id) && !playlist.collborators.includes(currentUser._id)) {
            return res.status(400).json({ err: "Not allowed" });
        }
        const song = await Song.findOne({ _id: songId });
        if (!song) {
            return res.status(400).json({ err: "Song does not exist" });
        }
        playlist.songs.push(songId);
        await playlist.save();
        return res.status(200).json(playlist);
    } catch (error) {
        return res.status(500).json({ err: "Failed to add song to playlist" });
    }
});

module.exports = router;
