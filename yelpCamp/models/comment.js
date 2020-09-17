var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
	text: String,
	campID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Campground'
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	}
});

module.exports = mongoose.model('Comment', commentSchema);