var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	User = require('./models/user'),
	app = express();

var campgroundRoutes = require('./routes/campgrounds'),
	commentRoutes = require('./routes/comments'),
	indexRoutes = require('./routes/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// ====== PASSPORT SESSION CONFIG ======

app.use(session({
	secret: 'abc',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField:"user[username]", 
	passwordField:"user[password]"
}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===== DB CONFIG ======

dotenv.config({path: '../.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

// ===== MAIN APP =====
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.use('/', indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

app.listen(3000, function() {
	console.log('Yelp Camp Started');
});