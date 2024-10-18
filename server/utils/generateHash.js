const bcrypt = require('bcryptjs');

const constants = require('./constants');
const salt = bcrypt.genSaltSync(constants.hash_saltRounds);

const generateHash = (value) => {
	return value ? bcrypt.hashSync(value, salt) : '';
}

module.exports = generateHash;