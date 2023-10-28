
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
		type: BigInt,
		required: true
	},
	priority_level: {
		type: mongoose.Types.ENUM,
		values: CONSTANTS.BUDGET_PRIORITY_LEVELS
	},

	created_by: {type: mongoose.ObjectId, ref: User}
})

modle.exports = mongoose.model('Budget', budgetSchema)