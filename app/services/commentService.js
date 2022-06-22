const Comment = require('./../models/Comment');

const create = async (data) => {
	return await new Comment({
		user: data.userId,
		post: data.postId,
		comment: data.comment,
	}).save();
};


module.exports = {
	create,
};
