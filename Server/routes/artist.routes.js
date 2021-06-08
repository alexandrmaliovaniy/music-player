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


module.exports = router;