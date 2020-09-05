var axios = require('axios');

// thenable promises
console.log('Sunset in Jakarta is at ');
axios.get('http://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=f2fd245bb0a5803935f7d2003ac446df')
	.then(function (response) {
		// handle success
		// console.log(response.data);
		sunset_timestamp = response.data.sys.sunset;
		let sunset_date = new Date(sunset_timestamp * 1000 + 420 * 60 * 1000);
		let sunset_hours = sunset_date.getHours();
		let sunset_minutes = '0' + sunset_date.getMinutes();
		let sunset_seconds = '0' + sunset_date.getSeconds();
		console.log(sunset_hours + ':' + sunset_minutes.substr(-2) + ':' + sunset_seconds.substr(-2));
	})
	.catch(function (error) {
		// handle error
		console.log(error);
	})
	.then(function () {
		// always executed
	});

// async await
// (async () => {
//   try {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// })()