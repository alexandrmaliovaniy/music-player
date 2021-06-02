const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const {Types} = require('mongoose');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Song = require('../models/Song');
const router = Router();


router.get('/:playlistId/:order', async(req, res) => {
    const {playlistId, order} = req.params;
    const songs = await Song.aggregate([
        {
            $match: {
                "originalPlaylist": {$eq: Types.ObjectId(playlistId)}
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
                originalPlaylist: {$arrayElemAt: ["$originalPlaylist", 0]}
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
    ]);
    if (!songs[order]) return res.status(404).json({message: "song not found"});
    res.json(songs[order]);
})


module.exports = router;