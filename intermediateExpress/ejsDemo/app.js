var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
	// res.send('Welcome to the homepage');
});

app.get('/fallinlove/:thing', function(req, res) {
	var thing = req.params.thing;
	res.render('love', {thingVar: thing});
});

app.get('/posts', function(req, res) {
	var posts = [
		{
			title: 'How to get highest score in class',
			author: 'Susy'
		},
		{
			title: 'How to get to know each other',
			author: 'Susan'
		},
		{
			title: 'How to speak in front of the class',
			author: 'Ti'
		}
	];
	res.render('posts', {posts:posts});
});

app.listen(3000, function(){
	console.log('ejsDemo started');
});