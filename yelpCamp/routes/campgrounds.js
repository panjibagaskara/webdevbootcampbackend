var express = require('express'),
	router = express.Router(),
	Campground = require('../models/campground'),
	Comment = require('../models/comment');

router.get('/', function(req, res) {
	Campground.find({})
		.then((campgrounds) => {
			res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
		})
		.catch((err) => {
			res.redirect('/campgrounds/new');
		})
});

router.post('/', isLoggedIn, function(req, res) {
	var name = req.body.campName;
	var url = req.body.campImage;
	var desc = req.body.campDescription;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	Campground.create({
		name: name,
		img_url: url,
		description: desc,
		author: author
	})
	.then((campground) => {
		res.redirect('/campgrounds');
	})
	.catch((err) => {
		res.redirect('/campgrounds/new');
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
			res.redirect('/campgrounds');
		});
});

router.get('/:id/edit', function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('campgrounds/edit', {campground:campground});
		})
		.catch((err) => {
			res.redirect('/campgrounds');
		})
})

router.put('/:id', function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.camp)
		.then((campground) => {
			res.redirect('/campgrounds/${req.params.id}');
		})
		.catch((err) => {
			res.redirect('/campgrounds');;
		});
});

router.delete('/:id', function(req, res) {
	Campground.findByIdAndRemove(req.params.id)
		.then((campground) => {
			Comment.deleteMany({campID: campground._id})
			.then(() => {
				res.redirect('/campgrounds')
			})
			.catch((err) => {
				res.redirect('/campgrounds')
			})
		})
		.catch((err) => {
			res.redirect('/campgrounds')
		})
})

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;