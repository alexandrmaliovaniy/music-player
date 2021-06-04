const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    image: {type: String},
    name: {type: String},
    songs: [{type: Types.ObjectId, ref: "Song"}],
    author: {type: Types.ObjectId, ref: "User"}
});

module.exports = model("Playlist", schema);