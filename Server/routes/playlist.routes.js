const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Playlist');
const Playlist = require('../models/Playlist');
const auth = require('../middleware/auth.middleware');
const Song = require('../models/Song');
const SongPayload = require('../models/SongPayload');
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
    ])
    res.json(playlists);
})

router.get("/:id", auth, async(req, res) => {
    const playlistId = req.params.id;
    const userId = req.user.id;
    const user = await User.findById(userId);
    let playlist = await Playlist.aggregate([
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
            $addFields: {
                author: {$arrayElemAt: ["$author", 0]}
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
                songs: {
                    payload: 0
                },
                author: {
                    email: 0,
                    favorites: 0,
                    password: 0,
                    playlists: 0,
                    image: 0,
                }
            }
        },
    ]);
    const out = playlist[0];
    const songs = out?.songs;
    for (let i = 0; i < songs.length; i++) {
        const el = songs[i];
        const isOrig = el.originalPlaylist == playlistId;
        el.originalImage = !isOrig && (await Playlist.findById(el.originalPlaylist)).image;
        el.originalAuthor = !isOrig && (await User.findById(el.author, {_id: 1, username: 1}));
        el.length = new Date(el.length * 1000 || 0).toISOString().substr(14, 5);
        el.favorite = user.favorites.includes(el._id);
    }
    out.songs = songs;
    res.json(out);
})
router.get("/list/:listId", async(req, res) => {
    const listId = req.params.listId;
    const playlist = await Playlist.findById(listId);
    if (!playlist) return res.status(404).json({message: "Playlist not found"});
    res.json(playlist.songs);
});
router.post("/", auth, async(req, res) => {
    const {id} = req.user;
    const playlist = new Playlist({
        name: "New Playlist",
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
router.post("/add", auth, async(req, res) => {
    const {song, playlist} = req.body;
    await Playlist.findByIdAndUpdate(playlist, {
        $push: {
            songs: song
        }
    });
    res.json({message: "success"});
});
router.post("/song", auth, async(req, res) => {
    const {playlistId, song} = req.body;
    const {id} = req.user;
    const songPayload = new SongPayload({
        payload: song.song
    });
    await songPayload.save();
    const newSong = new Song({
        name: song.name,
        originalPlaylist: playlistId,
        author: id,
        length: song.time,
        listenCount: 0,
        payload: songPayload._id
    })
    newSong.save();
    await Playlist.updateOne({_id: playlistId}, {$push: {
        songs: newSong.id
    }})
    res.json({message: "ok"});
})

module.exports = router;