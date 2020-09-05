var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
		{name: 'Gunung Putri', img:'https://i2.wp.com/hargakamar.com/wp-content/uploads/2019/04/Harga-Tiket-Masuk-Bukit-Alesano-Campground-Bogor.jpg?resize=630%2C380&ssl=1'},
		{name: 'Bumi Perkemahan Cibubur', img:'https://www.travelblog.id/wp-content/uploads/2019/06/Travelblogid-Campground-Candi-Gedong-Songo.jpeg'},
		{name: 'Himalaya', img:'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false'},
	{name: 'Gunung Putri', img:'https://i2.wp.com/hargakamar.com/wp-content/uploads/2019/04/Harga-Tiket-Masuk-Bukit-Alesano-Campground-Bogor.jpg?resize=630%2C380&ssl=1'},
		{name: 'Bumi Perkemahan Cibubur', img:'https://www.travelblog.id/wp-content/uploads/2019/06/Travelblogid-Campground-Candi-Gedong-Songo.jpeg'},
		{name: 'Himalaya', img:'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false'},
	{name: 'Gunung Putri', img:'https://i2.wp.com/hargakamar.com/wp-content/uploads/2019/04/Harga-Tiket-Masuk-Bukit-Alesano-Campground-Bogor.jpg?resize=630%2C380&ssl=1'},
		{name: 'Bumi Perkemahan Cibubur', img:'https://www.travelblog.id/wp-content/uploads/2019/06/Travelblogid-Campground-Candi-Gedong-Songo.jpeg'},
		{name: 'Himalaya', img:'https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false'}
	];

app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
	var name = req.body.campName;
	var url = req.body.campImage;
	var newCamp = {name: name, img: url};
	campgrounds.push(newCamp);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.listen(3000, function() {
	console.log('Yelp Camp Started');
});