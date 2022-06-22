const slugify = require('slugify')

const {getCategoryOrFail} = require('./../services/categoryService');
const reactionService = require('./../services/reactionService');
const commentService = require('./../services/commentService');
const Post = require('./../models/Post');

const all = async () => {
	return await Post.find()
	.populate('author')
	.populate('category');
}

const create = async (userId, data) => {
	const slug = slugify(data.title, "-");

	const checkSlugResults = await searchBySlug(slug);

	const category = await getCategoryOrFail(data.categoryId);
	
	const post = await new Post({
		title: data.title,
		description: data.description,
		author: userId,
		slug: checkSlugResults > 0 ? `${slug}-${checkSlugResults}` : slug,
		category: category.id
	}).save();

	return {
		post,
	};
}

const update = async (id, data) => {
	const category = await getCategoryOrFail(data.categoryId);
	
	const post = await Post.findOneAndUpdate(
		{ _id: id },
		{
			$set: {
				description: data.description,
				category: category.id,
			},
		},
		{ new: true }
	);

	return {
		post,
	};
}

const comment = async (data) => {
	const post = await Post.findOne({ slug : data.slug });

	await commentService.create({
		userId: data.id,
		postId: post.id,
		comment: data.comment,
	});

	return {
		post,
	};
};

const like = async (userId, slug) => {
	const post = await Post.findOne({slug});

	await reactionService.updateOrCreate({
		userId,
		postId: post.id,
		liked: true
	});

	return {
		post,
	};
}

const favorite = async (userId, slug) => {
	const post = await Post.findOne({slug});

	await reactionService.updateOrCreate({
		userId,
		postId: post.id,
		favorite: true,
	});

	return {
		post,
	};
}

const deletePost = async (id) => {
	const post = await Post.findById(id);

	if (!post) {
		throw new Error('Post not found!');
	}

	await Post.deleteOne({ _id: id });

	return {
		post,
	};
};

const searchBySlug = async (slug) => { 
	const searchInput = new RegExp(slug, "i");
	const searchedResults = await Post.find({
		slug: {
			$regex: searchInput,
		},
	});

	return  searchedResults.length
}

const getBySlug = async (slug) => {
	return await Post.findOne({
		slug,
	});
};

const checkIfUserIsAuth = async (user, id) => {
	return user.role == 'admin' || await Post.findOne({
		id,
		author: user.id,
	});
};

const isNotAllowed = async (user, slug) => {
	return !!await Post.findOne({
		slug,
		author: user.id,
	});
};

module.exports = {
	all,
	create,
	update,
	deletePost,
	getBySlug,
	checkIfUserIsAuth,
	isNotAllowed,
	favorite,
	comment,
	like,
};
