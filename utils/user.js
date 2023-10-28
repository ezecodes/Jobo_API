const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { CLIENT_ID, SECRET_KEY, USER_JWT_SECRET } = require('../config')

async function generatePasswordHash(password) {
  const salt_round = 10
  return await bcrypt.hash(password, salt_round)
}

async function createJwtToken(id) {
  const maxAge = '1d'
  return await jwt.sign({userId: id}, USER_JWT_SECRET, {expiresIn: maxAge})
}

async function validatePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
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
	generateSHA512String, 
  generatePasswordHash,
  createJwtToken,
  validatePassword
}