var express = require('express'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user'),
	session = require('express-session'),
	app = express();
	
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'abc',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
dotenv.config({path: '/workspace/webdevbootcamp/.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

passport.use(new LocalStrategy({usernameField:"user[username]", passwordField:"user[password]"}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ============ ROUTES ===========

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
	res.render('secret');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	User.register(new User({username: req.body.user.username}), req.body.user.password)
		.then((user) => {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/secret');
			})
		})
		.catch((err) => {
			console.log(err);
			res.redirect('/register')
		});
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}),(req, res) => {
	
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

// ======= Start Server =========

app.listen(3000, () => {
	console.log('Auth Demo Started');
});