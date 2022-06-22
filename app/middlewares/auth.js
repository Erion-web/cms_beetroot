const jwt = require("jsonwebtoken");
const { RANDOM_TOKEN_SECRET } = require('./../const/config');

module.exports = (req,res,next) => {
	try {
		const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null; 
		
		if(!token){
			throw new Error('Token isn\'t valid');
		}

		const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);

		req.user = {
			id: decodedToken.id,
			username: decodedToken.username,
			name: decodedToken.name,
			role: decodedToken.role,
		}
		
		next();
	} catch (error) {
		return res.status(401).json({
			status: false,
			data : {
				msg  : "Invaild token, unauthorized!"
			}
		})
	}
}
