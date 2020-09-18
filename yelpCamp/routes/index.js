var express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	User = require('../models/user');
	
router.get('/', function(req, res) {
	res.render('landing');
});

router.get('/register', function(req, res) {
	res.render('users/register');
});

router.post('/register', function(req, res) {
	User.register(new User({username: req.body.user.username}), req.body.user.password)
		.then((user) => {
			passport.authenticate('local')(req, res, () => {
				req.flash('success', '<strong>Success!</strong> Welcome to Yelp Camp' + user.username);
				res.redirect('/campgrounds');
			})
		})
		.catch((err) => {
			req.flash('error', '<strong>Error!</strong> ' + err.message);
			res.redirect('/register');
		});
});

router.get('/login', function(req, res) {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}));

router.get('/logout', function(req, res) {
	req.flash('success', '<strong>Success!</strong> You are logged out')
	req.logout();
	res.redirect('/');
});

module.exports = router;