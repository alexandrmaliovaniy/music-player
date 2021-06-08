const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();


// /api/artist/:id

router.get("/info/:id", async(req, res) => {
    const artistId = req.params.id;
    const artist = await User.findById(artistId);
    if (!artist) return res.status(404).json({message: "Artist not found"});
    req.json(artist);
})
router.get("/playlists/:id", async(req, res) => {
    const userId = req.params.id;
    console.log(userId);
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



module.exports = router;