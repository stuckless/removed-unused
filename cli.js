#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs');
const removeUnused = require('./remove-unused');

const argv = yargs
  .usage('Usage: $0 <files...> [options]')
  .option('keepImports', {
    alias: 'i',
    type: 'array',
    description: 'List of imports to keep',
  })
  .option('keepVars', {
    alias: 'v',
    type: 'array',
    description: 'List of variables to keep',
  })
  .help('h')
  .alias('h', 'help')
  .demandCommand(1).argv;

const files = argv._;
const keepImports = argv.keepImports || [];
const keepVars = argv.keepVars || [];

function processFile(filePath, options) {
  fs.readFile(filePath, 'utf-8', (err, fileContent) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    const newFileContent = removeUnused(fileContent, options);

    fs.writeFile(filePath, newFileContent, (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
        return;
      }

      console.log(`Successfully processed ${filePath}`);
    });
  });
}

files.forEach((filePath) => processFile(filePath, { keepImports, keepVars }));
