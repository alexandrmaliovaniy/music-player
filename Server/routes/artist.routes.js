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
router.update("/favorite/:songId/:del", auth, async(req, res) => {
    const userId = req.user.id;
    const songId = req.params.songId;
    const del = Boolean(req.params.delete);
    const param =  {"fovorites": songId};
    try {
        if (del) {
            await User.updateOne({_id: userId}, {$pull: param})
        } else {
            await User.updateOne({_id: userId}, {$push: param})
        }
        res.json({message: "success"})
    } catch(e) {
        console.log(e);
        res.status(404).json({message: "Can't follow"});
    }
})


module.exports = router;