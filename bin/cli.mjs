#!/usr/bin/env node
import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { minifyFiles } from '../lib/minify-js.mjs'
import { stringToBoolean, valueFromEnvVariables, getLogger } from '../lib/utils.mjs'

const inputPathVariables = ['PLUGIN_INPUT_PATH', 'PARAMETER_INPUT_PATH', 'INPUT_DIRECTORY']
const outputPathVariables = ['PLUGIN_OUTPUT_PATH', 'PARAMETER_OUTPUT_PATH', 'INPUT_OUTPUT']
const addSuffixVariables = ['PLUGIN_ADD_SUFFIX', 'PARAMETER_ADD_SUFFIX', 'INPUT_ADD_SUFFIX']
const inclusionsVariables = ['PLUGIN_INCLUSIONS', 'PARAMETER_INCLUSIONS', 'INPUT_INCLUSIONS']

const options = yargs(hideBin(process.argv))
  .option('input-path', {
    alias: 'i',
    type: 'string',
    description: 'File to minify or a folder containing files to minify',
    default: valueFromEnvVariables(inputPathVariables) ? valueFromEnvVariables(inputPathVariables) : process.cwd()
  })
  .option('output-path', {
    alias: 'o',
    type: 'string',
    description: 'Path where the minified files will be saved',
    default: valueFromEnvVariables(outputPathVariables)
  })
  .option('add-suffix', {
    alias: 'a',
    type: 'boolean',
    description: 'Indicates if the output files should have the suffix `.min` added after the name',
    default: valueFromEnvVariables(addSuffixVariables) ? stringToBoolean(valueFromEnvVariables(addSuffixVariables)) : true
  })
  .option('inclusions', {
    type: 'string',
    description: 'Multi-line string, each line of which contains a regex representing files to include/minify',
    default: valueFromEnvVariables(inclusionsVariables)
  })
  .parse()

const inputPath = options.i
const outputPath = options.o
const addSuffix = options.a
var inclusions = []

if (options.inclusions) {
  const inclusionParts = options.inclusions.replace('\\n', '\n').split(/[\r\n]+/)
  getLogger().debug('Inclusions: ', inclusionParts)

  for (var index = 0; index < inclusionParts.length; index++) {
    inclusions.push(RegExp(inclusionParts[index]))
  }
}

if (fs.existsSync(inputPath)) {
  minifyFiles(inputPath, addSuffix, outputPath, inclusions)
} else {
  getLogger().error('Input path ', inputPath, " doesn't exist")
}
