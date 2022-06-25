const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { RANDOM_TOKEN_SECRET, hashSalt } = require('./../const/config');

module.exports = {
	async hashPassword(passowrd){
		const salt = bcrypt.genSaltSync(hashSalt);

		return bcrypt.hashSync(passowrd, salt);
	},
	async checkPassword(password, hash){
		return bcrypt.compareSync(password, hash);
	},
	async createJwt(payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(
				payload,
				RANDOM_TOKEN_SECRET,
				{
					expiresIn: '1d'
				},
				(err, token) => {
					if(err){
						reject(err)
					}

					resolve(token);
				}
			)
		})
	}
}
