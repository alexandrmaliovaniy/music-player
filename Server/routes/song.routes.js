const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const {Type} = require('mongoose');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Song = require('../models/Song');
const router = Router();


router.get('/:id', async(req, res) => {
    const songId = Type.ObjectId(req.params.id);

    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');

    const bucket = new mongodb.GridFSBucket()



    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({message: "song not found"});
    res.json(song.data);
})


module.exports = router;