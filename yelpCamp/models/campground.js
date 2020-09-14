var mongoose = require('mongoose');

var campgroundsSchema = new mongoose.Schema({
	name: String,
	img_url: String,
	description: String,
	comments : [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

module.exports = mongoose.model('Campground', campgroundsSchema);