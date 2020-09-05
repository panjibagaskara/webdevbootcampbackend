var express = require('express');
var app = express();

// '/' => "Hi there"
app.get('/', function(req, res) {
	res.send('Hi There');
});

// '/bye' => "Goodbye"
app.get('/bye', function(req, res) {
	res.send('GoodBye!');
});

// '/dog' => "MEOW!"
app.get('/dog', function(req,res) {
	res.send('Meow!');
})

app.get('/r/:subName', function(req, res) {
	res.send(req.params.subName);
});

app.get('*', function(req, res) {
	res.send('You are a star');
})
// listen
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});