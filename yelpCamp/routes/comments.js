var express = require('express'),
	router = express.Router({mergeParams: true}),
	Campground = require('../models/campground'),
	Comment = require('../models/comment');

router.get('/new', isLoggedIn, function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('comments/new', {campground: campground});
		})
		.catch((err) => {
			res.redirect('/campgrounds/' + req.params.id);
		});
});

router.post('/', isLoggedIn, function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			Comment.create(req.body.comment)
			.then((comment) => {
				campground.comments.author = req.user;
				campground.save();
				campground.comments.push(comment);
				campground.save();
				res.redirect('/campgrounds/' + campground._id);
			})
			.catch((err) => {
				res.redirect('/campgrounds/' + campground._id + '/comments/new');
			});
		})
		.catch((err) => {
			res.redirect('/campgrounds');
		});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;