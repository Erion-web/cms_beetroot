const Validator = require('validator');

module.exports = function validateCategoryInput(data) {
	data.title =  !! data.title ? data.title : '';
	data.slug =  !! data.slug ? data.slug : '';

	let errors = {};
	
	if(Validator.isEmpty(data.title)){
		errors.title = "Title is required";
	}
	
	if(Validator.isEmpty(data.slug)){
		errors.slug = "Slug is required";
	}

	return {
		errors,
		isValid : Object.keys(errors).length === 0
	}
}
