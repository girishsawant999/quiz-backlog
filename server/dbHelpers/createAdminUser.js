const User = require('../models/user');
const generateHash = require('../utils/generateHash');

async function createAdminUser() {
	try {
		// Check if admin user already exists
		const admin = await User.findOne({ isAdmin: true });

		if (!admin) {
			// If no admin exists, create one
			const newAdmin = new User({
				firstName: 'admin',
				mobile: 12312323,
				email: 'admin@admin.com',
				password: generateHash('admin_2024'),
				isAdmin: true,
				isActive: true
			});

			await newAdmin.save();
			console.log('Admin user created successfully');
		} else {
			console.log('Admin user already exists');
		}
	} catch (err) {
		console.error('Error creating admin user:', err);
	}
};
module.exports = createAdminUser;