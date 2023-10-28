var express = require('express');
var router = express.Router();

const {
  validateUser,
  validateUserCredentials
} = require('./middlewares/user')

const {
  generatePasswordHash
} = require('../../utils/user')

const {
  NODE_ENV
} = require('../../config')

const userService = require('../../services/user')

/* GET users listing. */
router.get('/:user_id', validateUser, function(req, res, next) {
  
});


/* POST users listing */
router.post('/', async (req, res) => {
  const {email, password} = req.body

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
    const hashedPassword = await generatePasswordHash(password)
    const newUser = await UserModel.create({email, password: hashedPassword})

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
  res.cookie('token', token, {
    signed: true,
    path: '/user',
    maxAge: 1000 * 60 * 60, 
    httpOnly: true, 
    secure: NODE_ENV === 'production' ? true : false
  })
})


module.exports = router;
