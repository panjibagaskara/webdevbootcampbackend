var Campground = require('../models/campground'),
    Comment = require('../models/comment'),
    middlewareObject = {};

middlewareObject.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
		Campground.findById(req.params.id)
		.then((campground) => {
			if (campground.author.id.equals(req.user._id)) {
				return next();
			}
            req.flash('error', '<strong>Error!</strong> You dont have permission to do that');
            res.redirect('back')
		})
		.catch((err) => {
            req.flash('error', '<strong>Error!</strong> Campground is not found');
			res.redirect('back')
		})
	} else {
        req.flash('error', '<strong>Error!</strong> You need to be login to do that');
		res.redirect('back');
	}
}

middlewareObject.checkCCommentOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id)
		.then((comment) => {
			if (comment.author.id.equals(req.user._id)) {
				return next();
			}
            req.flash('error', '<strong>Error!</strong> You dont have permission to do that');
            res.redirect('back')
		})
		.catch((err) => {
            req.flash('error', '<strong>Error!</strong> Campground is not found');
			res.redirect('back')
		})
	} else {
        req.flash('error', '<strong>Error!</strong> You need to be login to do that');
		res.redirect('back');
	}
}

middlewareObject.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
		return next();
    }
    req.flash('error', '<strong>Error!</strong> You need to be login to do that');
	res.redirect('/login');
}

module.exports = middlewareObject;