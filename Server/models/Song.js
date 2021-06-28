const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    originalPlaylist: {type: Types.ObjectId},
    author: {type: Types.ObjectId},
    length: {type: Number},
    listenCount: {type: Number},
    payload: {type: Types.ObjectId, required: true}
});

module.exports = model("Song", schema);