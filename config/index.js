require('dotenv').config()
const mongoose = require('mongoose');
const db = mongoose.connection

module.exports = {
	db,
	NODE_ENV: process.env.NODE_ENV,
    CLIENT_ID: process.env.clientId,
    SECRET_KEY: process.env.secretKey,
	OpenBanking_primary_key: process.env.FCMB_open_banking_primary_key,
	OpenBanking_secondary_key: process.env.FCMB_open_banking_secondary_key,
}