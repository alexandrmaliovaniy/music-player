const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    image: {type: String},
    name: {type: String, required: true},
    songs: [{type: Types.ObjectId, ref: "Song"}]
});

module.exports = model("Playlist", schema);