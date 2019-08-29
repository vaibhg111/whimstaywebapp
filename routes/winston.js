var winston = require('winston');
require('winston-daily-rotate-file');
 
var transport = new (winston.transports.DailyRotateFile)({
  filename: 'log/Wemastewebapp-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '1d'
});

transport.on('rotate', function(oldFilename, newFilename) {
 
});


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'whimstaywebapp-service' },
    transports: [
      transport
    ]
  });


  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }


  logger.stream = {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    },
  };


  module.exports = logger;


 