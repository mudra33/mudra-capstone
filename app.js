const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT || 5000;

//MiddleWare

const middleWare = (req, res, next) => {
	console.log('hello my middleware');
	next();
};

// middleWare();
//top to bottom approach router if first then these below ones will get ignored

// app.get('/', (req, res) => {
// 	res.send('Hello World From Server');
// });

// app.get('/about', middleWare, (req, res) => {
// 	res.send('Hello About World From Server');
// });

// app.get('/contact', (req, res) => {
// 	res.send('Hello Contact World From Server');
// });

// app.get('/signin', (req, res) => {
// 	res.send('Hello Login World From Server');
// });

// app.get('/signup', (req, res) => {
// 	res.send('Hello Registration World From Server');
// });

//3rd step huroku

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/build'));
}

app.listen(PORT, () => {
	console.log(`server is running at port no ${PORT}`);
});
