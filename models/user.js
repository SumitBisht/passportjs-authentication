var mongoose = require('mongoose')
, schema = mongoose.Schema

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
	oauthtoken: {type: String}
});

module.exports = mongoose.model('User', UserSchema, 'auth');