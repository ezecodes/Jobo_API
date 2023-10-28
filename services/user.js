const https = require('https')
const {CLIENT_ID} = require('../config')

module.exports.getAccountStatement = (accountNumber) => {
	const [startDate, endDate] = ['10-JUL-2023', '20-AUG-2023']
	return new Promise((resolve, reject) => {

		let req = https.request({
	      method: 'GET',
	      hostname: 'https://devapi.fcmb.com',
	      port: 443,
	      path: `/statementapi/api/Statement/getB2bAccountStatement?accountNumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}&filterType=A`,
	      headers: {
	        'Content-Type': 'application/json',
	        client_id: CLIENT_ID
	      }
	    }, res => {
	      let data = ''

	      res.on('data', chunk => data += chunk)

	      res.on('end', () => {
	        data = JSON.parse(data)
	        resolve(data)
	      })

	    })
	    req.end()
	})
}