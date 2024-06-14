const express = require("express");
const mongoose = require('mongoose');
const app = express();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/Song');
const User = require("./models/User");
const playlistRoutes = require("./routes/playlist");
require("dotenv").config();

const port = 4001;
app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://ananyashenoy62:xHZLWvm95A41Bp5B@cluster0.upgfiiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisissecretkey';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
    console.log("App is running on port:" + port);
});
