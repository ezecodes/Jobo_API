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
	  return res.status(201).json({
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
