const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	title: {type: String, required: true}, 
	slug: {type: String, required: true}, 
})

module.exports = mongoose.model('categories', CategorySchema)
