
const mongoose = require('mongoose')

const Budget = require('./Budget')

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		lowercase: true,
	},
	last_name: {
		type: String,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	available_balance: {type: Number, default: 0},
	password: {type: String, required: true},
	pin: {type: String, lowercase: true},
	budgets: [{type: mongoose.Types.ObjectId, ref: 'Budget'}]
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)