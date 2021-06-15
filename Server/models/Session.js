const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    id: {type: String, required: true},
    refreshToken: {type: String, required: true}
});

module.exports = model("Session", schema);