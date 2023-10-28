const {createLogger, format, transports, config} = require('winston');
const { combine, timestamp, label, printf } = format;
const {NODE_ENV} = require('../config')

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${level}: ${message} ${timestamp}` ;
});

let transportsObject = {
  console: new transports.Console({ level: 'debug' }),
}

const logger = createLogger({
  levels: config.syslog.levels,
  format: combine(
    timestamp(),
    label({label: NODE_ENV === 'development' ? 'dev log' : 'prod log'}),
    myFormat
  ),
  transports: [
    transportsObject.console,
  ]
})

module.exports = logger