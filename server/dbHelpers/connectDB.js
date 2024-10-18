const mongoose = require('mongoose');
const dotenv = require("dotenv");
const createAdminUser = require('./createAdminUser');

// load env config
dotenv.config();
// Setup MongoDB
const dbURI = process.env.MONGODB_URL
mongoose.connect(dbURI)
	.then(async () => {
		console.log('Connected to MongoDB');
		createAdminUser && createAdminUser();
	})
	.catch(error => {
		console.error('Error connecting to MongoDB:', error);
	});