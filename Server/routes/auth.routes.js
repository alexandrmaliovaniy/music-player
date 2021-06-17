const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
const router = Router();



// /api/auth/login //

router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    const error = {password: {
        status: false,
        text: "Wrong email or password.",
        serverSide: true
    }};
    const user = await User.findOne({email});
    if (!user) return res.status(400).json(error);

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) return res.status(400).json(error);

    const {token, refreshToken} = AuthIn(user.id, user.username);

    res.json({token, refreshToken, id: user.id, username: user.username});
});

// /api/auth/registration //

router.post("/registration", async(req, res) => {
    try {
        const {email, username, password} = req.body;

        const uniqueMail = await User.findOne({email});
        if (uniqueMail) return res.status(400).json({email: {status: false, text: "This email is already registered!", serverSide: true}});

        const uniqueUsername = await User.findOne({username});
        if (uniqueUsername) return res.status(400).json({username: {status: false, text: "This name is already taken", serverSide: true}});

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            username,
            password: hashedPassword
        });
        await newUser.save();

        const {token, refreshToken} = AuthIn(newUser.id, newUser.username);

        res.status(200).json({token, refreshToken, id: newUser.id, username: newUser.username});
        
    } catch(e) {
        throw e
    }

});
router.post("/refresh", async(req, res) => {
    const {id, refreshToken} = req.body;
    const session = await Session.findOne({id, refreshToken});
    if (!session) return res.json({token: null});
    jwt.verify(refreshToken, config.get("jwtSecretRefresh"), (err, user) => {
        if (err) return res.json({token: null});
        const token = SignToken(user.id, user.username, "jwtSecret", '15m');
        res.json({token});
    })
});
router.post("/logout", async(req, res) => {
    const {id, refreshToken} = req.body;
    Session.findOneAndRemove({id, refreshToken});
    res.json({message: "success"});
});
const AuthIn = (id, username) => {
    const token = SignToken(id, username, "jwtSecret", '15m');
    const refreshToken = SignToken(id, username, "jwtSecretRefresh", "1y");
    const newSession = new Session({
        id,
        refreshToken
    });
    newSession.save();
    return {token, refreshToken};
}

const SignToken = (id, username, secret, expire) => {
    const token = jwt.sign(
        {
            id,
            username
        },
        config.get(secret),
        {expiresIn: expire}
    )
    return token;
}

module.exports = router;