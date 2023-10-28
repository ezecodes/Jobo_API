var crypto = require('crypto')

const { CLIENT_ID, SECRET_KEY }

function generateSHA512String() {
	let data = crypto.createHash('sha512').update(`${getFormattedDateTime()}250Re0R%0Fd`)
	return data.digest('hex')
}

function getFormattedDateTime() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  
  return formattedDateTime;
}

module.exports = {
	generateSHA512String,
}