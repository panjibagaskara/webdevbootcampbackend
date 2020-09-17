var express = require('express'),
	router = express.Router(),
	Campground = require('../models/campground');

router.get('/', function(req, res) {
	Campground.find({})
		.then((campgrounds) => {
			res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
		})
		.catch((err) => {
			redirect('/campgrounds/new');
		})
});

router.post('/', isLoggedIn, function(req, res) {
	var name = req.body.campName;
	var url = req.body.campImage;
	var desc = req.body.campDescription;
	Campground.create({
		name: name,
		img_url: url,
		description: desc
	})
	.then((campground) => {
		res.redirect('/campgrounds');
	})
	.catch((err) => {
		redirect('/campgrounds/new');
	});
});

router.get('/new', isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec()
		.then((campground) => {
			res.render('campgrounds/show', {campground: campground});
		})
		.catch((err) => {
			redirect('/campgrounds');
		});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;