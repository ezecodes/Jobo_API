require('dotenv').config()

const mongoose = require('mongoose');
const db = mongoose.connection
require('dotenv').config()

db.once('open', () => console.log(`DB connected`));
console.log('db connecting...');

(async function establishConnection() {
    try {
        await mongoose.connect( process.env.DB_URL , {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    } catch (err) {
        console.log('DB failed to connect')
        console.error(err)
    }
})();


module.exports = {
	db,
	OpenBanking_primary_key: process.env.FCMB_open_banking_primary_key,
	OpenBanking_secondary_key: process.env.FCMB_open_banking_secondary_key,
}