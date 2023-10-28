
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
	pin: {type: String, lowercase: true},
	budgets: [{type: mongoose.Types.ObjectId, ref: 'Budget'}]
})


module.exports = mongoose.model('User', userSchema)