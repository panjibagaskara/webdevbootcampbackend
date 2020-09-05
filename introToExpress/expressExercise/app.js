var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hi there, welcome to my assignment');
});

// Pake dinamis juga bisa
app.get('/speak/pig', function(req, res) {
	res.send("The pig says 'Oink'");
});

app.get('/speak/cow', function(req, res) {
	res.send("The cow says 'Moo'");
});

app.get('/speak/dog', function(req, res) {
	res.send("The dog says 'Woof Woof'");
});


app.get('/repeat/:word/:num', function(req, res) {
	var str = '';
	for (var i = 0; i < req.params.num; i++) {
		str += ' ' + req.params.word;
	}
	res.send(str);
});

app.get('*', function(req, res) {
	res.send('Sorry, page not found... What are you doing with your life?');
});

app.listen(3000, function() {
	console.log('Assigment server has started');
})