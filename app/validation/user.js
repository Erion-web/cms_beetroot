const Validator = require('validator');

module.exports = {
	validateRegisterInput(data) {
		data.username = !!data.username ? data.username : '';
		data.firstName = !!data.firstName ? data.firstName : '';
		data.lastName = !!data.lastName ? data.lastName : '';
		data.password = !!data.password ? data.password : '';
		data.passwordConfirmation = !!data.passwordConfirmation
			? data.passwordConfirmation
			: '';

		let errors = {};

		if (Validator.isEmpty(data.username)) {
			errors.username = 'Username is required';
		}

		if (Validator.isEmpty(data.firstName)) {
			errors.firstName = 'firstName is required';
		}

		if (Validator.isEmpty(data.lastName)) {
			errors.lastName = 'lastName is required';
		}

		if (Validator.isEmpty(data.password)) {
			errors.password = 'Password is required';
		}

		if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
			errors.password =
				'Password length should be less than 6 char greater than 15 char';
		}

		if (Validator.isEmpty(data.passwordConfirmation)) {
			errors.passwordConfirmation = 'Password confirmation is required';
		}

		if (!Validator.equals(data.password, data.passwordConfirmation)) {
			errors.passwordConfirmation = "Password doesn't match!";
		}

		return {
			errors,
			isValid: Object.keys(errors).length === 0,
		};
	},
	validateChangePasswordInput(data) {
		data.oldPassword = !!data.oldPassword ? data.oldPassword : '';
		data.password = !!data.password ? data.password : '';
		data.passwordConfirmation = !!data.passwordConfirmation
			? data.passwordConfirmation
			: '';

		let errors = {};

		if (Validator.isEmpty(data.oldPassword)) {
			errors.oldPassword = 'oldPassword is required';
		}

		if (Validator.isEmpty(data.password)) {
			errors.password = 'Password is required';
		}

		if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
			errors.password =
				'Password length should be less than 6 char greater than 15 char';
		}

		if (Validator.isEmpty(data.passwordConfirmation)) {
			errors.passwordConfirmation = 'Password confirmation is required';
		}

		if (!Validator.equals(data.password, data.passwordConfirmation)) {
			errors.passwordConfirmation = "Password doesn't match!";
		}

		return {
			errors,
			isValid: Object.keys(errors).length === 0,
		};
	},
	validateProfileInput(data) {
		data.username = !!data.username ? data.username : '';
		data.firstName = !!data.firstName ? data.firstName : '';
		data.lastName = !!data.lastName ? data.lastName : '';

		let errors = {};

		if (Validator.isEmpty(data.username)) {
			errors.username = 'Username is required';
		}

		if (Validator.isEmpty(data.firstName)) {
			errors.firstName = 'firstName is required';
		}

		if (Validator.isEmpty(data.lastName)) {
			errors.lastName = 'lastName is required';
		}

		return {
			errors,
			isValid: Object.keys(errors).length === 0,
		};
	},
};
