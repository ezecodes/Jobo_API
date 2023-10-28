const crypto = require('crypto')
const mongoose = require('mongoose');

const { CLIENT_ID, SECRET_KEY, DB_URL } = require('../config')
const logger = require('../logger')

async function establishConnection() {
  logger.info('Establishing DB connection')
  try {
    await mongoose.connect( DB_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('DB connection established')
  } catch (err) {
    logger.error('DB connection failed');
    logger.debug(err)
    process.exit(1)
  }
}

function generateSHA512String() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  
	let data = crypto.createHash('sha512').update(`${formattedDateTime}${CLIENT_ID}${SECRET_KEY}`)

	return data.digest('hex')
}




module.exports = {
	generateSHA512String, establishConnection
}