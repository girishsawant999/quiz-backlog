const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
	// Get the token from the Authorization header
	const authHeader = req.header('Authorization');
	if (!authHeader) {
		return res.status(401).json({ message: 'Access denied. No token provided.' });
	}
	// Token should be in the form: "Bearer <token>"
	const token = authHeader;

	if (!token) {
		return res.status(401).json({ message: 'Access denied. Invalid token format.' });
	}

	// Verify the token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(400).json({ message: 'Invalid token.' });
	}
}

module.exports = authMiddleware;