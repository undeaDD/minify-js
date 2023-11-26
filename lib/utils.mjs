import fs from 'fs'
import path from 'path'
import SimpleNodeLogger from 'simple-node-logger'

var logger

export function stringToBoolean (value) {
  return value === 'true'
}

export function valueFromEnvVariables (envVariables) {
  var value

  for (var index = 0; index < envVariables.length; index++) {
    var variableName = envVariables[index]
    value = process.env[variableName]

    if (value) {
      break
    }
  }

  return value
}

export function pathWithTrailingSeparator (inputPath) {
  return inputPath.endsWith(path.sep) ? inputPath : inputPath + path.sep
}

export function getLogger () {
  if (!logger) {
    logger = SimpleNodeLogger.createSimpleLogger()

    if (process.env.LOGGING_LEVEL_ROOT) {
      logger.setLevel(process.env.LOGGING_LEVEL_ROOT)
    }
  }

  return logger
}

export function isDirectory (inputPath) {
  return fs.lstatSync(inputPath).isDirectory()
}
