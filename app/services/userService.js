const User = require('./../models/User');

const { hashPassword, createJwt } = require('./../helpers/encrypting')

const login = async (user) => {
	const token = await createJwt({
		id: user.id,
		username: user.username,
		name: `${user.firstName} ${user.lastName}`,
	});

	return {
		token
	}
}

const register = async (data) => {
	const hashedPassword = await hashPassword(data.password);

	const user = await new User({
		firstName: data.firstName,
		lastName: data.lastName,
		username: data.username,
		password: hashedPassword,
	}).save();

	const token = await createJwt({
		id: user.id,
		username: user.username,
		name: `${user.firstName} ${user.lastName}`,
	});

	return {
		user,
		token
	};
}

const changePassword = async (id, data) => {
	const hashedPassword = await hashPassword(data.password);
	const user = await User.findOneAndUpdate(
		{ id },
		{
			$set: {
				password: hashedPassword,
			},
		}
	);

	return {
		user: {
			id: user.id,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role,
		},
	};
};

const checkUsername = async (username) => {
	return await User.findOne({username});
}

const getUser = async (id, returnWithPassword = false) => {
	const user =  await User.findById(id)

	if(returnWithPassword){
		return { 
			user
		}
	}

	return {
		user: {
			id : user.id,
			username : user.username,
			firstName : user.firstName,
			lastName : user.lastName,
			role : user.role,
		}
	}
}

const profile = async (id, data) => {
	const user =  await User.findOneAndUpdate(
		{id},
		{
			$set:{
				firstName: data.firstName,
				lastName: data.lastName,
				username: data.username,
			}
		},
		{ new : true}
	)

	return {
		user: {
			id : user.id,
			username : user.username,
			firstName : user.firstName,
			lastName : user.lastName,
			role : user.role,
		}
	}
}

module.exports = {
	login,
	register,
	checkUsername,
	getUser,
	profile,
	changePassword,
};
