
const mongoose = require('mongoose')
const {CONSTANTS} = require('../config')

const User = require('./User')

const budgetSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		lowercase: true
	},
	description: {
		type: String,
		required: true,
		lowercase: true
	},
	amount: {
		type: Number,
		required: true
	},
	priority_level: {
		type: String,
		enum:{values: CONSTANTS.BUDGET_PRIORITY_LEVELS}
	},

	created_by: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Budget', budgetSchema)