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
        }
    ]);
    if (!songs[order]) return res.status(404).json({message: "song not found"});
    res.json(songs[order]);
})


module.exports = router;