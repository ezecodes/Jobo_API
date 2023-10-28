
const mongoose = require('mongoose')
const {CONSTANTS} = require('../config')

const Budget = require('./Budget')

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		lowercase: true,
		required: true
	},
	last_name: {
		type: String,
		lowercase: true,
		required: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	budgets: [{type: mongoose.ObjectId, ref: Budget}]
})


module.exports = mongoose.model('User', userSchema)