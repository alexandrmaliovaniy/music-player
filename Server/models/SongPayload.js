const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    payload: {type: String, required: true}
});

module.exports = model("SongPayload", schema);