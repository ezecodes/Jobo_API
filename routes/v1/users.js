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

/* GET users listing. */
router.get('/', validateUser, async function(req, res, next) {
  const {userId} = req

  try {
    const findUser = await UserModel.findById(userId).select(['email', 'first_name,' 'last_name', 'available_balance'])
    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: 'Resource Not Found'
      })
    }
    return res.status(200).json({
      success: true,
      data: {
        user: findUser
      }
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong'
    })
    logger.debug(err)
  }
    

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
      password: hashedPassword
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
    path: '/',
    maxAge: 1000 * 60 * 60, 
    httpOnly: true, 
    secure: NODE_ENV === 'production' ? true : false
  });
  res.status(200).json({
    success: true,
    message: 'Login Successful'
  })
})


module.exports = router;
