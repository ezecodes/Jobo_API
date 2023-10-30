var express = require('express');
var router = express.Router();
const {
  validateUser,
  validateUserCredentials
} = require('./middlewares/user')

const {
  validateNewBudget
} = require('./middlewares/budget')

const BudgetModel = require('../../models/Budget')
const UserModel = require('../../models/User')
const logger = require('../../logger')


/* GET users listing. */
router.get('/:budget_id', validateUser, async function(req, res, next) {
	const {budget_id} = req.params
  try {
  	const findBudget = await BudgetModel.findById(budget_id)
  	if (!findBudget) {
  		return res.status(404).json({
  			success: false,
  			message: 'Requested Resource Could Not Be Found.'
  		})
  	}

  	res.status(200).json({
  		success: true,
  		message: 'Resource Found',
  		data: findBudget
  	})
  } catch (err) {
  	logger.debug(err)
  }
});

router.get('/', validateUser, async (req, res) => {
	let page_number = Number(req.query.page_number)
	let page_size = Number(req.query.page_size)

	if (isNaN(page_number) || isNaN(page_size)) {
		return res.status(400).json({
			success: false,
			message: 'Invalid Request Query Parameters.',
			hint: '"page_size" Is The Number Of Items Requested, "page_number" Is The Current Page Requested'
		})
	}
	const {userId} = req
	
	try {
		const findBudgets = await BudgetModel.find({created_by: userId})
			.skip((page_number - 1) * page_size)
			.limit(page_size)

		if (findBudgets.length) {
			return res.status(200).json({
				success: true,
				message: 'Resource Found.',
				data: {
					budgets: findBudgets
				}
			})
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Something went wrong.'
		})

		logger.debug(err)
	}
})


/* POST users listing */
router.post('/', validateUser, validateNewBudget, async (req, res) => {
  const {userId} = req
	const {title, description, priority_level, amount} = req.body

	try {
	  const newBudget = await BudgetModel.create({
	  	title,
	  	description,
	  	priority_level,
	  	amount,
	  	created_by: userId
	  })
	  await UserModel.findById(userId, (err, user) => {
	  	if (user) {
	  		user.budgets.push(newBudget.id)
	  		user.save()
	  	}
	  })

	  res.status(201).json({
	  	success: true,
	  	message: 'New Budget Created Successfully.',
	  	data: {
	  		title, description, priority_level, amount
	  	}
	  })


	} catch (err) {
	 	logger.debug(err)
	}

})


module.exports = router;
