var express = require('express');
var axios = require('axios');

var app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('search');
});

app.get('/results', function(req, res) {
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?apikey=thewdb&s=' + query;
	(async () => {
	  try {
		const response = await axios.get(url);
		// res.send(response.data);
		res.render('results', {data: response.data});
	  } catch (error) {
		res.send(error.response.statusText);
	  }
	})();
});

app.listen(3000, function() {
	console.log('Movie App Started')
})