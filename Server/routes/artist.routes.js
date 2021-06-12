const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Playlist = require("../models/Playlist");
const Song = require('../models/Song');
const auth = require('../middleware/auth.middleware');
const router = Router();


// /api/artist/:id

router.get("/info/:id", async(req, res) => {
    const artistId = req.params.id;
    const {_id, username, image} = await User.findById(artistId);
    if (!_id) return res.status(404).json({message: "Artist not found"});
    res.json({_id, username, image});
})
router.get("/subPlaylists/:id", async(req, res) => {
    const userId = req.params.id;
    const data = await User.aggregate([
        {
            $match: {
                "_id": { $eq: Types.ObjectId(userId) }
            }
        },
        {
            $lookup: {
                from: 'playlists',
                localField: 'playlists',
                foreignField: '_id',
                as: 'playlists'
            }
        },
        {
            $project: {
                playlists: {
                  _id: 1,
                  name: 1
                }
            }
        }
    ])
    res.json(data[0].playlists);
})
router.get("/favorite/:songId/:setFav", auth, async(req, res) => {
    const userId = req.user.id;
    const songId = req.params.songId;
    const setFav = req.params.setFav;
    try {
        if (setFav == "false") {
            await User.findByIdAndUpdate(userId, {$pull: {
                "favorites": songId
            }})
        } else {
            await User.findByIdAndUpdate(userId, {$push: {
                "favorites": songId
            }})
        }
        res.json({message: "success"})
    } catch(e) {
        console.log(e);
        res.status(404).json({message: "Can't follow"});
    }
})
router.get("/favorites", auth, async(req, res) => {
    const userId = req.user.id;
    const data = await User.aggregate([
        {
            $match: {
                "_id": { $eq: Types.ObjectId(userId) }
            }
        },
        {
            $lookup: {
                from: 'songs',
                localField: 'favorites',
                foreignField: '_id',
                as: 'favorites'
            }
        },
        {
            $project: {
                favorites: {
                    data: 0
                }
            }
        }
    ]);
    const out = data[0].favorites;
    for (let i = 0; i < out.length; i++) {
        out[i].author = await User.findById(out[i].author, {_id: 1, username: 1});
        out[i].originalPlaylist = await Playlist.findById(out[i].originalPlaylist, {image: 1, name: 1, _id: 1});
        out[i].length = new Date(out[i].length * 1000 || 0).toISOString().substr(14, 5);
        out[i].favorite = true;
    }
    res.json(out);
});
router.get("/popular/:id", auth, async(req, res) => {
    const artistId = req.params.id;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const songs = await Song.aggregate([
        {
            $match: {
                "author": {$eq: Types.ObjectId(artistId)}
            }
        },
        {
            $sort: {listenCount: 1}
        },
        {
            $limit: 5
        },
        {
            $project: {
                data: 0
            }
        }
    ]);
    for (let i = 0; i < songs.length; i++) {
        songs[i].originalPlaylist = await Playlist.findById(songs[i].originalPlaylist, {image: 1, name: 1, _id: 1});
        songs[i].length = new Date(songs[i].length * 1000 || 0).toISOString().substr(14, 5);
        console.log(user.favorites, songs[i]._id)
        songs[i].favorite = user.favorites.includes(songs[i]._id);
    }
    res.json(songs);
});
router.get("/playlists/:id", async(req, res) => {
    const userId = req.params.id;
    const playlists = await Playlist.aggregate([
        {
            $match: {
                "author": {$eq: Types.ObjectId(userId)}
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
            $addFields: {
                author: {$arrayElemAt: ["$author", 0]}
            }
        },
        {
            $project: {
                songs: 0,
                author: {
                    email: 0,
                    favorites: 0,
                    password: 0,
                    playlists: 0,
                    image: 0
                }
            }
        }
    ]);
    res.json(playlists);
});
module.exports = router;