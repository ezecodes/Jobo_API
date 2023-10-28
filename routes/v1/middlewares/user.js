const UserModel = require('../../../models/User')
const logger = require('../../../logger')
const {USER_JWT_SECRET} = require('../../../config')
const jwt = require('jsonwebtoken')

const {
	validatePassword
} = require('../../../utils/user')

async function validateUser(req, res, next) {
	const token = req.signedCookies.token
	if (!token) return res.status(401).json({
		success: false,
		message: 'Unauthorized'
	})
    jwt.verify(token, USER_JWT_SECRET, (err, info) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }
        req.userId = info.userId
        next()
    })
}

async function validateUserCredentials(req, res, next) {
    let {email, password} = req.body
    try {
        let findUser = await UserModel.findOne({email})
        if (!findUser || !await validatePassword(password, findUser.password) ) {
            return res.status(401).json({
            	success: false,
            	message: 'Invalid credentials'
            })
        }
        req.userId = findUser.id
        next()

    } catch (err) {
        logger.error('Could not validate user')
        logger.debug(err)
    }
}

module.exports = {
	validateUser,
	validateUserCredentials
}