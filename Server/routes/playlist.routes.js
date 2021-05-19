const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Playlist');
const Playlist = require('../models/Playlist');
const {Types} = require('mongoose');
const router = Router();



// /api/playlist/popular
// Return all playlist for first time
router.get("/popular", async(req, res) => {
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
    res.json(playlists);
})

// /api/playlist/:id
// returns all data for playlist page
router.get("/:id", async(req, res) => {
    const playlistId = req.params.id;
    const playlist = await Playlist.aggregate([
        {
            $match: {
                "_id": {$eq: Types.ObjectId(playlistId)}
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $lookup: {
                from: 'songs',
                localField: 'songs',
                foreignField: '_id',
                as: 'songs'
            }
        }
    ]);
    res.json(playlist);
})

module.exports = router;