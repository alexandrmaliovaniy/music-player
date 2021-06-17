const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const { Types } = require('mongoose');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Song = require('../models/Song');
const router = Router();


router.get('/:songId', async (req, res) => {
    const songId = req.params.songId;
    const songs = await Song.aggregate([
        {
            $match: {
                "_id": { $eq: Types.ObjectId(songId) }
            }
        },
        {
            $lookup: {
                from: 'playlists',
                localField: 'originalPlaylist',
                foreignField: '_id',
                as: 'originalPlaylist'
            }
        },
        {
            $addFields: {
                originalPlaylist: { $arrayElemAt: ["$originalPlaylist", 0] }
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
                author: { $arrayElemAt: ["$author", 0] }
            }
        },
        {
            $addFields: {
                length: {
                    $function: {
                        body: function (length) {
                            return new Date(length * 1000 || 0).toISOString().substr(14, 5)
                        },
                        args: ["$length"],
                        lang: "js"
                    }
                }
            }
        }
    ]);
    if (!songs[0]) return res.status(404).json({ message: "song not found" });
    res.json(songs[0]);
})

router.post('/listen', async (req, res) => {
    try {
    const {_id} = req.body;
    const song = await Song.findById(_id);
    song.listenCount++;
    song.save();
    res.json({message: "success"});
    } catch(e) {
        console.log(e);
    }
});

module.exports = router;