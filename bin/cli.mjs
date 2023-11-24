#!/usr/bin/env node
import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { minifyFiles } from '../lib/minify-js.mjs'
import { stringToBoolean, valueFromEnvVariables, getLogger } from '../lib/utils.mjs'

const inputPathVariables = ['PLUGIN_INPUT_PATH', 'PARAMETER_INPUT_PATH', 'INPUT_DIRECTORY']
const outputPathVariables = ['PLUGIN_OUTPUT_PATH', 'PARAMETER_OUTPUT_PATH', 'INPUT_OUTPUT']
const addSuffixVariables = ['PLUGIN_ADD_SUFFIX', 'PARAMETER_ADD_SUFFIX', 'INPUT_ADD_SUFFIX']

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
  .parse()

const inputPath = options.i
const outputPath = options.o
const addSuffix = options.a

if (fs.existsSync(inputPath)) {
  minifyFiles(inputPath, addSuffix, outputPath)
} else {
  getLogger().error('Input path ', inputPath, " doesn't exist")
}
