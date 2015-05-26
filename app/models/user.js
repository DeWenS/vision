var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    fb: {
        id: String,
        first_name: String,
        last_name: String,
        access_token: String
    }
});

module.exports = mongoose.model('User', UserSchema);