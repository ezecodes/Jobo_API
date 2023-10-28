require('dotenv').config()
const mongoose = require('mongoose');
const db = mongoose.connection

module.exports = {
	db,
	DB_URL: process.env.DB_URL,
	NODE_ENV: process.env.NODE_ENV,
    CLIENT_ID: process.env.CLIENT_ID,
    SECRET_KEY: process.env.SECRET_KEY,
	OPEN_BANKING_PK: process.env.OPEN_BANKING_PK,
	OPEN_BANKING_SK: process.env.OPEN_BANKING_SK,

	USER_JWT_SECRET: process.env.USER_JWT_SECRET,
	USER_COOKIE_SECRET: process.env.USER_JWT_SECRET,

	CONSTANTS: {
		BUDGET_PRIORITY_LEVELS: ['high', 'medium', 'low'],
	}
}