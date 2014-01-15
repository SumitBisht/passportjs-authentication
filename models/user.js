var mongoose = require('mongoose');
var schema = mongoose.Schema;
var module = require('module');

var UserSchema = new schema({
    provider: { type: String, default: '' },
    id: { type: String },
    displayName: { type: String, default: '' },
    name: { },

    emails: {
        value: { type: String, default: '' },
        type: { type: String, default: '' }
    },

    photos: { },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    oauthtoken: {type: String},
    // Following fields are for saving the manually entered credentials for the basic user
    username: {type: String},
    password: {type: String}
});

UserSchema.methods.validPassword = function(pwd){
    return ( this.password === pwd );
};

module.exports = mongoose.model('User', UserSchema, 'auth');