const User = require('../models/user');

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Invalid email or password." });
		}
		// check if user exists
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password." });
		}
		// check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}
		if (!user.isActive) {
			return res.status(400).json({ message: 'Your account is locked, check with your administrator.' });
		}
		user.lastLoggedAt = new Date();
		// generate token if password is correct
		const token = await user.generateAuthToken();
		return res.status(200).json({ message: 'Login successful', data: { user, token } });
	} catch (error) {
		res.status(500).json({ message: error?.message || 'Internal Server Error' });
	}
};