const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Playlist');
const Playlist = require('../models/Playlist');
const auth = require('../middleware/auth.middleware');
const Song = require('../models/Song');
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
        },
        {
            $project: {
                "songs.data": 0,
                "author.image": 0
            }
        }
    ]);
    res.json(playlist);
})
router.post("/", auth, async(req, res) => {
    const {id} = req.user;
    const playlist = new Playlist({
        name: "",
        image: "",
        author: id,
        songs: []
    });
    await playlist.save();
    await User.updateOne({_id: id}, {$push: {
        playlists: playlist.id
    }})
    res.json({id: playlist.id});
})
router.post("/data", auth, async(req, res) => {
    const {playlistId, name, image} = req.body;
    try {
        await Playlist.updateOne({_id: playlistId}, {
            name, image
        })
        res.json({message: "ok"});
    } catch(e) {
        res.json(e);
    }
})
router.post("/song", auth, async(req, res) => {
    const {playlistId, song} = req.body;
    const {id} = req.user;
    const newSong = new Song({
        name: song.name,
        originalPlaylist: playlistId,
        author: id,
        length: song.time,
        listenCount: 0,
        data: song.song
    })
    newSong.save();
    await Playlist.updateOne({_id: playlistId}, {$push: {
        songs: newSong.id
    }})
    res.json({message: "ok"});
})

module.exports = router;