'use strict';

const fs = require('fs');
const util = require('util');
const events = require('./events.js');
require('./logger.js');

/**
 * Promisify fs.readfile and fs.writefile
 */
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Alter the file content into Uppercase
 * @param {*} file 
 */


const alterFile = (file) => {
  
  /**
   * read file 
   */
  read(file)
    .then(data => {
      /**
       * change the text into uppercase
       */
      let text = uppercase(data);
      /**
       * write the text back into the file
       */
      return write(file, text);
    })

    /**
     * report the status
     */
    .then(() => events.emit('save', file))

    /**
     * error handler
     */
    .catch(error => events.emit('getError', error));
};

/**
 * function for reading files
 */
function read(file) {
  return readFile(file);
}

/**
 * function for changing the text into uppercase
 * @param {*} data 
 */
function uppercase(data) {
  return Buffer.from(data.toString().toUpperCase());
}

/**
 * function that write the text back into the file
 * @param {*} file 
 * @param {*} contents 
 */
function write(file, contents) {
  return writeFile(file, contents);
}


let file = process.argv.slice(2).shift();
alterFile(file);


module.exports = {read, uppercase, write};

