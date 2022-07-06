const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
	try {
		console.log(req.Cookie, 'Capital COokie');
		console.log(req.cookies, 'Small cookies');
		console.log(req.Cookies, 'Capital Cookies');
		console.log(req.cookie, 'request');
		const token = req.cookies.jwtoken;
		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

		const rootUser = await User.findOne({
			_id: verifyToken._id,
			'tokens.token': token,
		});

		if (!rootUser) {
			throw new Error('User Not found');
		}
		req.token = token;
		req.rootUser = rootUser;
		req.userId = rootUser._id;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send('Unauthorized : No Token Provided');
	}
};
module.exports = Authenticate;
