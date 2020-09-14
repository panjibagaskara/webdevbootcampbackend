var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config({path: '/workspace/webdevbootcamp/.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});


app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({})
		.then((campgrounds) => {
			res.render('campgrounds/campgrounds', {campgrounds: campgrounds});
		})
		.catch((err) => {
			redirect('/campgrounds/new');
		})
	// res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
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

app.get('/campgrounds/new', function(req, res) {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id).populate('comments').exec()
		.then((campground) => {
			res.render('campgrounds/show', {campground: campground});
		})
		.catch((err) => {
			redirect('/campgrounds');
		});
});

// Comment Section

app.get('/campgrounds/:id/comments/new', function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('comments/new', {campground: campground});
		})
		.catch((err) => {
			res.redirect('/campgrounds/' + req.params.id);
		});
});

app.post('/campgrounds/:id/comments', function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			Comment.create(req.body.comment)
			.then((comment) => {
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

app.listen(3000, function() {
	console.log('Yelp Camp Started');
});