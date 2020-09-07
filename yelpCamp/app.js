var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv'),
	app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
dotenv.config({path: '/workspace/webdevbootcamp/.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//Schema Setup
var campgroundsSchema = new mongoose.Schema({
	name: String,
	img_url: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundsSchema);

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({})
		.then((campgrounds) => {
			res.render('campgrounds', {campgrounds: campgrounds});
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
	res.render('new');
});

app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id)
		.then((campground) => {
			res.render('show', {campground: campground});
		})
		.catch((err) => {
			redirect('/campgrounds');
		});
});

app.listen(3000, function() {
	console.log('Yelp Camp Started');
});