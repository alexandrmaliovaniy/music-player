const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Playlist');
const Playlist = require('../models/Playlist');
const router = Router();



// /api/playlist/popular

router.get("/popular", async(req, res) => {

    // Return all playlist for first time

    console.log(1);
    const playlists = await Playlist.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $project: {
                "songs": 0
            }
        }
    ])
    // const playlists = await Playlist.find({});
    res.json(playlists);
})


module.exports = router;