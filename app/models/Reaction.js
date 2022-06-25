const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'users',
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'posts',
	},
	liked: { type: Number, default: 0 },
	favorite: { type: Number, default: 0 },
});

module.exports = mongoose.model('reactions', ReactionSchema);
