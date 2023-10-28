var express = require('express');
var router = express.Router();
const logger = require('../../logger')

const {
  validateUser,
  validateUserCredentials
} = require('./middlewares/user')

const {
  generatePasswordHash,
  createJwtToken
} = require('../../utils/user')

const {
  NODE_ENV
} = require('../../config')

const UserModel = require('../../models/User')

const userService = require('../../services/user')

/* GET users listing. */
router.get('/:user_id', validateUser, async function(req, res, next) {
  const {userId} = req
  const {user_id} = req.params

  // const accountStatement = await getAccountStatement()
  // console.log(accountStatement)

});


/* POST users listing */
router.post('/', async (req, res) => {
  const {last_name, first_name, email, password} = req.body

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Email Value'
    })
  }
  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Invalid Password Value'
    })
  }

  try {
    const findUser = await UserModel.findOne({email})
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: 'Email Already Exists'
      })
    }

    const hashedPassword = await generatePasswordHash(password)
    const newUser = await UserModel.create({
      email, 
      password: hashedPassword, 
      first_name: first_name || '', 
      last_name: last_name || ''
    })

    return res.status(201).json({
      success: true,
      message: 'User Created Successfully',
      data: {email}
    })
  } catch (err) {
    logger.debug(err)
  }
})

router.post('/login', validateUserCredentials, async (req, res) => {
  const token = await createJwtToken(req.userId)
  res.cookie('token', token, {
    signed: true,
    path: '/user',
    maxAge: 1000 * 60 * 60, 
    httpOnly: true, 
    secure: NODE_ENV === 'production' ? true : false
  })
})


module.exports = router;
