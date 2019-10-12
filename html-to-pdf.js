#!/usr/bin/env node
/*
 *  2017-2019 Matthias Pronk
 *  License: MIT
 *
 *  Simple script that turns HTML into PDF using headless Chrome/Chromium.
 *  It uses the Puppeteer module from npm for the heavy lifting.
 */

const path = require('path');
const puppeteer = require('puppeteer-core');
const which = require('which');

// Resolve the path to Chrome/Chromium
const chromePath = function() {
  const executableNames = [
    "google-chrome",
    "chromium-browser",
    "chromium",
  ];
  resolved = executableNames.find(function(name) {
    return which.sync(name, { nothrow: true });
  });
  if (resolved) {
    return resolved;
  } else {
    throw "No Chrome or Chromium executable found.";
  }
};

var argv = require('yargs')
  .usage('Usage: $0 [-b] [-f fmt] [-p /path/to/chrome] <inputfile> <outputfile>')
  .demand(2)
  .describe('b', 'Print background')
  .boolean('b')
  .alias('b', 'printBackground')
  .default('b', false)
  .describe('f', 'Paper format')
  .default('f', 'A4')
  .choices('f', ['Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'])
  .alias('f', 'format')
  .describe('p', 'Path to Chrome/Chromium executable')
  .alias('p', 'chromePath')
  .default('p', chromePath)
  .argv;

(async () => {
  var inputfile = path.resolve(argv._[0]);
  var outputfile = path.resolve(argv._[1]);
  const browser = await puppeteer.launch({
    executablePath: argv.chromePath,
    args: [
      '--disable-web-security'
    ]
  });
  const page = await browser.newPage();
  await page.goto('file://' + inputfile, {waitUntil: 'networkidle2'});
  await page.pdf({path: outputfile, format: argv.format, printBackground: argv.printBackground});
  await browser.close();
})();
