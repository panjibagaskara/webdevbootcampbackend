var faker = require('faker');
faker.locale = 'id_ID';

console.log('==================');
console.log('WELCOME TO MY SHOP')
console.log('==================');

for (let i = 0; i < 10; i++) {
	console.log(faker.commerce.productName() + ' - $' + faker.commerce.price());
}