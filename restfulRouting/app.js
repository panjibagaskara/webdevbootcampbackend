 var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	dotenv = require('dotenv'),
	methodOverride = require('method-override'),
	expressSanitier = require('express-sanitizer'),
	app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitier());
app.use(methodOverride('_method'));
dotenv.config({path: '/workspace/webdevbootcamp/.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

function setDateGMT() {
	var date = new Date();
	date.setTime(date.getTime() + 420*60*1000);
	return date
}

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: setDateGMT}
});
var Blog = mongoose.model('Blog', blogSchema);

app.get('/blogs', (req, res) => {
	Blog.find({})
		.then((blogs) => {
			res.render('index', {blogs:blogs});
		})
		.catch((err) => {
			res.send('Error');
		});
});

app.get('/blogs/new', (req, res) => {
	res.render('new');
});

app.post('/blogs', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog)
		.then(() => {
			res.redirect('/blogs');
		})
		.catch((err) => {
			res.render('new');
		});
});

app.get('/blogs/:id', (req, res) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			res.render('show', {blog:blog});
		})
		.catch(() => {
			res.redirect('/blogs');
		});
});

app.get('/blogs/:id/edit', (req, res) => {
	Blog.findById(req.params.id)
		.then((blog) => {
			res.render('edit', {blog:blog});
		})
		.catch(() => {
			res.redirect('/blogs');
		});
});

app.put('/blogs/:id', (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog)
		.then(() => {
			res.redirect('/blogs/' + req.params.id);
		})
		.catch(() => {
			res.redirect('/blogs');
		})
});

app.delete('/blogs/:id', (req, res) => {
	Blog.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect('/blogs');
		});
});

app.get('*', (req, res) => {
	res.redirect('/blogs');
});

app.listen(3000, () => {
	console.log('Restful Blog Demo Started');
	console.log(setDateGMT());
})