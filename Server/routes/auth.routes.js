const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();



// /api/auth/login //

router.post("/login", async(req, res) => {

});

// /api/auth/registration //

router.post("/registration", async(req, res) => {
    try {
        const {email, username, password, birthday} = req.body;

        const uniqueMail = await User.findOne({email});
        if (uniqueMail) return res.status(400).json({email: {status: false, text: "This email is already registered!"}});

        const uniqueUsername = await User.findOne({username});
        if (uniqueUsername) return res.status(400).json({username: {status: false, text: "This name is already taken"}});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            birthday,
            password: hashedPassword
        });
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username
            },
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.status(200).json({token, id: newUser.id, username: newUser.username});
        
    } catch(e) {
        throw e
    }

});
module.exports = router;