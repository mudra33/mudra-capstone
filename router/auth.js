const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

//to correct deployment
// router.get('/', (req, res) => {
// 	res.send('Hello World From Server Router js');
// });

//using promises
// router.post('/register', (req, res) => {
// 	const { name, email, phone, work, password, cpassword } = req.body;
// 	if (!name || !email || !phone || !work || !password || !cpassword) {
// 		return res.status(422).json({ error: 'please fill the fileds properly' });
// 	}

// 	User.findOne({ email: email })
// 		.then((userExist) => {
// 			if (userExist) {
// 				return res.status(422).json({ error: 'Email Already Exists' });
// 			}
// 			const user = new User({ name, email, phone, work, password, cpassword });

// 			user
// 				.save()
// 				.then(() => {
// 					res.status(201).json({ message: 'User Registered Succesfully' });
// 				})
// 				.catch((err) => res.status(500).json({ error: 'Failed  to register' }));
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});

// 	res.send('Hello World From Server Router js');
// });

router.post('/register', async (req, res) => {
	const { name, email, phone, work, password, cpassword } = req.body;
	if (!name || !email || !phone || !work || !password || !cpassword) {
		return res.status(422).json({ error: 'please fill the fileds properly' });
	}
	try {
		const userExist = await User.findOne({ email: email });

		if (userExist) {
			return res.status(422).json({ error: 'Email Already Exists' });
		} else if (password != cpassword) {
			return res.status(422).json({ error: 'passwords do not match' });
		} else {
			const user = new User({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
			});

			await user.save();

			res.status(201).json({ message: 'User Registered Succesfully' });
		}
	} catch (err) {
		console.log(err);
	}
});

router.post('/signin', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ error: 'please fill the fileds properly' });
	}
	try {
		let token;
		const userLogin = await User.findOne({ email: email });

		if (userLogin) {
			const isMatch = await bcrypt.compare(password, userLogin.password);

			token = await userLogin.generateAuthToken();
			res.cookie('jwtoken', token, {
				expires: new Date(Date.now() + 25892000000),
				httpOnly: true, // otherwise it will only run on secure
				secure: true,
				sameSite: 'none',
			});
			//expires in 30 days, write in milliseconds

			if (!isMatch) {
				res.status(400).json({ error: 'Invalid Credentials' });
			} else {
				res.json({ nessage: 'User Signin Successfully' });
			}
		} else {
			res.status(400).json({ error: 'Invalid Credentials' });
		}
	} catch (err) {
		console.log(err);
	}
});

router.get('/about', authenticate, (req, res) => {
	// res.send('Hello About World From Server');
	res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req, res) => {
	// res.send('Hello About World From Server');
	res.send(req.rootUser);
});

router.post('/contact', authenticate, async (req, res) => {
	try {
		const { name, email, phone, message } = req.body;

		if (name || email || phone || message) {
			return res.json({ error: 'please fill the contact form' });
		}
		const userContact = await User.findOne({ _id: req.userID });

		if (userContact) {
			const userMessage = await userContact.addMessage(
				name,
				email,
				phone,
				message
			);

			await userContact.save();
			res.status(201).json({ message: 'User Contact Successfully' });
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/logout', (req, res) => {
	res.clearCookie('jwtoken', { path: '/' });
	res.status(200).send('User Logged out');
});

module.exports = router;
