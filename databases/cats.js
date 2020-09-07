var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({path: '/workspace/webdevbootcamp/.env', debug: process.env.DEBUG});
mongoose.connect(process.env.DB_HOST, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

Cat.create({
	name: 'Snow White',
	age: 15,
	temperament: 'Bland'
})
.then(() => {
	console.log('Saved');
})
.catch((err) => {
	console.log('err.message');
});

// var george = new Cat({
// 	name: 'Norris',
// 	age: 7,
// 	temperament: 'Evil'
// });

// george.save()
// .then(() => {
// 	console.log('Saved');
// })
// .catch((err) => {
// 	console.log(err.message);
// })

Cat.find({})
.then((cats) => {
	console.log(cats);
})
.catch((err) => {
	console.log(err.message);
})