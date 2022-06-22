const categoryService = require('./../services/categoryService');
const validateCategoryInput = require('./../validation/category');

const all = async (req, res) => {
	try {
		const categories = await categoryService.all();

		return res.json({
			success: true,
			data: {
				categories,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const create = async (req, res) => {
	const { errors, isValid } = validateCategoryInput(req.body);

	if (!isValid) {
		return res.status(422).json({
			success: false,
			errors,
		});
	}

	try {
		const { category } = await categoryService.create(req.body);

		return res.json({
			success: true,
			data: {
				category,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const update = async (req, res) => {
	const { errors, isValid } = validateCategoryInput(req.body);

	if (!isValid) {
		return res.status(422).json({
			success: false,
			errors,
		});
	}

	const getCategory = await categoryService.getBySlug(req.body.slug);

	if(getCategory && getCategory.id != req.params.id){
		return res.status(400).json({
			success: false,
			msg: "Slug already exists!",
		});
	}

	try {
		const { category } = await categoryService.update(req.params.id, req.body);

		return res.json({
			success: true,
			data: {
				category,
			},
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

const deleteCategory = async (req, res) => {
	try {
		const { category } = await categoryService.deleteCategory(req.params.id);
		
		return res.json({
			success: true,
			data: {
				msg: "Deleted successfully!",
				category,
			},
		});
	} catch (e) {
		if (e.message === 'Category not found!'){
			return res.status(404).json({
				success: false,
				errors: {
					msg: e.message,
				},
			});
		}

		return res.status(500).json({
			success: false,
			errors: {
				msg: 'Something went wrong!',
			},
		});
	}
}; 

module.exports = {
	all,
	create,
	update,
	deleteCategory
};
