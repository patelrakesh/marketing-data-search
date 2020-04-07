import winston from 'winston'
const { combine, timestamp, printf } = winston.format

winston.error = err => {
  if (err instanceof Error) {
    winston.log({ level: 'error', message: `${err.stack || err}` });
  } else {
    winston.log({ level: 'error', message: err });
  }
};

const prodFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`
})

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    winston.configure({
      level: 'info',
      format: combine(
        timestamp(),
        prodFormat
      ),
      transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: process.env.LOG_PATH + '/error.log', level: 'error', timestamp: true }),
        new winston.transports.File({ filename: process.env.LOG_PATH + '/combined.log', timestamp: true })
      ],
      exceptionHandlers: [
        new winston.transports.File({ filename: process.env.LOG_PATH + '/exceptions.log', timestamp: true, maxsize: 1000000 })
      ],
      exitOnError: false, // <--- set this to false
    });
  }
  else {
    winston.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
} 