const express = require('express');
const config = require('config');
const MongoConnect = require('./MongoConnect');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const io = socketIO(http.createServer(app));

app.use(express.json({extended: true}));
app.use("/api/auth/", require('./routes/auth.routes'));
app.use("/api/artist/", require('./routes/artist.routes'));
app.use("/api/playlist/", require('./routes/playlist.routes'));


const PORT = config.get('port') || 5000;

MongoConnect(config.get("mongo"))
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    })
})
.catch(err => {
    throw err
})