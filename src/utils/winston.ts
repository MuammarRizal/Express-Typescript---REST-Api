import winston from 'winston/lib/winston/transports'
import 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'

const transport = new winston.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
  handleExceptions: true
})

export const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.json({ space: 2 }),
    format.timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    format.label({ label: '[LOGGER]' }),
    format.printf(
      (info) =>
        `${info.label} ${info.timestamp} ${info.level} : ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: 'silly',
      handleExceptions: true,
      format: format.combine(format.colorize({ all: true }))
    }),
    transport
  ]
})
