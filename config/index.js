require('dotenv').config()
const mongoose = require('mongoose');
const db = mongoose.connection

module.exports = {
	db,
	DB_URL: process.env.DB_URL,
	NODE_ENV: process.env.NODE_ENV,

	USER_JWT_SECRET: process.env.USER_JWT_SECRET,
	USER_COOKIE_SECRET: process.env.USER_COOKIE_SECRET,

	CONSTANTS: {
		BUDGET_PRIORITY_LEVELS: ['high', 'medium', 'low'],
		BUDGET_STATUSES: ['pending', 'done', 'failed']
	}
}