const Validator = require('validator');

module.exports = {
	validateCreatePostInput(data) {
		data.title =  !! data.title ? data.title : '';
		data.description =  !! data.description ? data.description : '';
		data.categoryId =  !! data.categoryId ? data.categoryId : '';

		let errors = {};
		
		if(Validator.isEmpty(data.title)){
			errors.title = "Title is required";
		}
		
		if(Validator.isEmpty(data.description)){
			errors.description = 'Description is required';
		}
		
		if(Validator.isEmpty(data.categoryId)){
			errors.categoryId = 'Category is required';
		}

		return {
			errors,
			isValid : Object.keys(errors).length === 0
		}
	},
	validateUpdatePostInput(data) {
		data.description = !!data.description ? data.description : '';
		data.categoryId = !!data.categoryId ? data.categoryId : '';

		let errors = {};

		if (Validator.isEmpty(data.description)) {
			errors.description = 'Description is required';
		}
				
		if (Validator.isEmpty(data.categoryId)) {
			errors.categoryId = 'Category is required';
		}

		return {
			errors,
			isValid: Object.keys(errors).length === 0,
		};
	}
}
