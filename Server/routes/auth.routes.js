const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();



// /api/auth/login //

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    const error = {password: {
        status: false,
        text: "Wrong email or password."
    }};
    const user = await User.findOne({email});
    if (!user) return res.status(400).json(error);

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.status(400).json(error);

    const token = SignToken(user.id, user.username);

    res.json({token, id: user.id, username: user.username});
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

        const token =  SignToken(newUser.id, newUser.username);

        res.status(200).json({token, id: newUser.id, username: newUser.username});
        
    } catch(e) {
        throw e
    }

});

const SignToken = (id, username) => {
    const token = jwt.sign(
        {
            id: id,
            username: username
        },
        config.get('jwtSecret'),
        {expiresIn: '1h'}
    )
    return token;
}

module.exports = router;