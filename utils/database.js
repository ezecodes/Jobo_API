const mongoose = require('mongoose');
const logger = require('../logger')
const { DB_URL } = require('../config')

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

module.exports = {
  establishConnection
}