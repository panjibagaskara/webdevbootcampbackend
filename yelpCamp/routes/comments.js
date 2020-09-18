var express = require('express'),
	router = express.Router({mergeParams: true}),
	Campground = require('../models/campground'),
	Comment = require('../models/comment'),
	middleware = require('../middleware');

router.get('/new', middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('comments/new', {campground: campground});
		})
		.catch((err) => {
			res.redirect('/campgrounds/' + req.params.id);
		});
});

router.post('/', middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			Comment.create(req.body.comment)
			.then((comment) => {
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				comment.campID = campground._id;
				comment.save();
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

router.get('/:comment_id/edit', middleware.checkCCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id)
	.then((comment) => {
		res.render('comments/edit', {comment:comment});
	})
	.catch((err) => {
		res.redirect('/campgrounds/' + req.params.id);
	})
	
});

router.put('/:comment_id', middleware.checkCCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
	.then(() => {
		res.redirect('/campgrounds/' + req.params.id)
	})
	.catch(() => {
		res.redirect('/campgrounds/' + req.params.id)
	})
});

router.delete('/:comment_id', middleware.checkCCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id)
	.then(() => {
		Campground.updateOne({_id: req.params.id}, {$pull: {comments: req.params.comment_id}})
		.then(() => {
			res.redirect('/campgrounds/' + req.params.id)
		})
		.catch(() => {
			res.redirect('back')
		})
	})
	.catch(() => {
		res.redirect('back')
	})
});

module.exports = router;