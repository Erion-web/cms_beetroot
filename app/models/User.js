const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true}, 
	password: {type: String, required: true}, 
	firstName: {type: String, required: true}, 
	lastName: {type: String, required: true}, 
	role: {
		type: String, 
		default: 'guest',
		enum: ['guest', 'admin']
	}, 
})

module.exports = mongoose.model('users', UserSchema)
