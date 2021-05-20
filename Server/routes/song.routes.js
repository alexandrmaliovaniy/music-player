const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Song = require('../models/Song');
const router = Router();


router.get('/:id', async(req, res) => {
    const songId = req.params.id;
    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({message: "song not found"});
    res.json(song);
})


module.exports = router;