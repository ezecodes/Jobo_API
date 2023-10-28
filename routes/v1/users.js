var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:user_id',  function(req, res, next) {
  
});


/* POST users listing */
router.post('/', async (req, res) => {
  
})
router.post('/login', async (req, res) => {
  const {username, password} = req.body
  
})


module.exports = router;
