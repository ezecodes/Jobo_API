
const nodeCron = require('node-cron')
const BudgetModel = require('../models/Budget')
const UserModel = require('../models/User')
const {CONSTANTS} = require('../config')
const logger = require('../logger')

let getCronTime = (priorityLevel) => {
	const [TWO_MINUTES, FIVE_MINUTES, TEN_MINUTES] = ["*/2 * * * *", "*/5 * * * *", "*/10 * * * *"]
	switch (priorityLevel) {
		case CONSTANTS.BUDGET_PRIORITY_LEVELS[0]:
			return TWO_MINUTES;
		case CONSTANTS.BUDGET_PRIORITY_LEVELS[1]:
			return FIVE_MINUTES;
		case CONSTANTS.BUDGET_PRIORITY_LEVELS[2]:
			return TEN_MINUTES
	}
}

async function executeJobAction(priorityLevel) {
	const findBudgets = await BudgetModel.find({status: CONSTANTS.BUDGET_STATUSES[0]}).populate('created_by');
	if (findBudgets.length === 0) {
		return
	}
	findBudgets.forEach(async budget => {
		// execute for only pending budgets
		if (budget.created_by.available_balance > budget.amount) {
			await UserModel.findByIdAndUpdate(
				budget.created_by.id, {available_balance: budget.created_by.available_balance - budget.amount}
			)

			await BudgetModel.findByIdAndUpdate(
				budget.id, 
				{status: CONSTANTS.BUDGET_STATUSES[1]}
			)
		}
	})
}

function startHighPriorityScheduler() {
	nodeCron.schedule(getCronTime(CONSTANTS.BUDGET_PRIORITY_LEVELS[0]), () => {
		executeJobAction(CONSTANTS.BUDGET_PRIORITY_LEVELS[0])
	})
}
function startMediumPriorityScheduler() {
	nodeCron.schedule(getCronTime(CONSTANTS.BUDGET_PRIORITY_LEVELS[1]), () => {
		executeJobAction(CONSTANTS.BUDGET_PRIORITY_LEVELS[1])
	})
}
function startLowPriorityScheduler() {
	nodeCron.schedule(getCronTime(CONSTANTS.BUDGET_PRIORITY_LEVELS[2]), () => {
		executeJobAction(CONSTANTS.BUDGET_PRIORITY_LEVELS[2])
	})
}

function startCronSchedulers() {
	startHighPriorityScheduler()
	startMediumPriorityScheduler()
	startLowPriorityScheduler()
}

module.exports = startCronSchedulers

