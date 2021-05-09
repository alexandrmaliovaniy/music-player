const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    avatar: {type: String},
    name: {type: String, required: true},
    description: {type: String, required: true},
    songs: [{type: Types.ObjectId, ref: "Song"}]
});

module.exports = model("Playlist", schema);