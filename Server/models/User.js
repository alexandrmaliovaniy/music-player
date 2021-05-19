const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    playlists: [{type: Types.ObjectId, ref: "Playlist"}],
    favorites: [{type: Types.ObjectId, ref: "Song"}],
    image: {type: String},
    banner: {type: String}
});

module.exports = model("User", schema);