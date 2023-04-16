import fs from 'fs'
import path from 'path'

export function log(message) {
  const logFilePath = path.join(process.cwd(), 'logs', 'log.txt')
  const logMessage = `${new Date().toISOString()} - ${message}\n`

  console.log(logMessage)

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`)
    }
  })
}
