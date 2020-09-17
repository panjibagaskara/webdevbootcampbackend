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
				res.redirect('/campgrounds');
			})
		})
		.catch((err) => {
			console.log(err);
			res.redirect('/register');
		});
});

router.get('/login', function(req, res) {
	res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}), function(req, res) {
	
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;