
const mongoose = require('mongoose')
const {CONSTANTS} = require('../config')

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
	status: {
		type: String,
		default: CONSTANTS.BUDGET_STATUSES[0],
		enum: {values: CONSTANTS.BUDGET_STATUSES}
	},
	amount: {
		type: Number,
		required: true
	},
	label: {type: String},
	priority_level: {
		type: String,
		enum:{values: CONSTANTS.BUDGET_PRIORITY_LEVELS}
	},
	recipient_account_name: {type: String},
	recipient_bank: {type: String},
	recipient_account_number: {type: Number},

	created_by: {type: mongoose.Types.ObjectId, ref: 'User'},
	
}, {timestamps: true})

module.exports = mongoose.model('Budget', budgetSchema)