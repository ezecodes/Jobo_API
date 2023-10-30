const {CONSTANTS} = require('../../../config')

async function validateNewBudget(req, res, next) {
	const {title, description, priority_level, amount} = req.body
	let isValidPriorityLevel = CONSTANTS.BUDGET_PRIORITY_LEVELS.find(i => i === priority_level)

	if (!title) {
		return res.status(400).json({
			success: false, 
			message: 'Enter A Valid Budget Title.'
		})
	}

	if (!description) {
		return res.status(400).json({
			success: false,
			message: 'Enter A Valid Budget Description.'
		})
	}
	if (!amount) {
		return res.status(400).json({
			success: false, 
			message: 'Enter A Valid Budget amount.'
		})
	}
	if (!priority_level || !isValidPriorityLevel) {
		return res.status(400).json({
			success: false, 
			message: 'Invalid Budget Priority Level.',
			hint: 'Valid values are "high", "low" and "medium"'
		})
	}

	next()
}

module.exports = {
	validateNewBudget
}