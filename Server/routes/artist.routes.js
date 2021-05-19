const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();


// /api/artist/:id

router.get("/:id", async(req, res) => {
    const artistId = req.params.id;
    const artist = await User.findById(artistId);
    if (!artist) return res.status(404).json({message: "Artist not found"});
    req.json(artist);
})



module.exports = router;