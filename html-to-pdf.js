#!/usr/bin/env node
/*
 *  2017 Matthias Pronk
 *  License: MIT
 * 
 *  Simple script that turns HTML to PDF using headless Chrome/Chromium.
 *  It uses the Puppeteer module from npm for the heavy lifting.
 */

const path = require('path');
const puppeteer = require('puppeteer');
var argv = require('yargs')
  .usage('Usage: $0 [-f fmt] <inputfile> <outputfile>')
  .demand(2)
  .describe('f', 'Paper format')
  .default('f', 'A4')
  .choices('f', ['Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6'])
  .alias('f', 'format')
  .describe('b', 'Print background')
  .boolean('b')
  .alias('b', 'printBackground')
  .default('b', false)
  .argv;

(async () => {
  var inputfile = path.resolve(argv._[0]);
  var outputfile = path.resolve(argv._[1]);
  const browser = await puppeteer.launch({
    args: [
      '--disable-web-security'
    ]
  });
  const page = await browser.newPage();
  await page.goto('file://' + inputfile, {waitUntil: 'networkidle2'});
  await page.pdf({path: outputfile, format: argv.format, printBackground: argv.printBackground});
  await browser.close();
})();
