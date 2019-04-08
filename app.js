'use strict';

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

/**
 * Alter the file content into Uppercase
 * @param {*} file 
 */
const alterFile = (file) => {
  readFile( `${__dirname}/test.txt`) 
    .then(data => {
      let text = data.toString().toUpperCase()
      return writeFile(`${__dirname}/test.txt`, Buffer.from(text))
        .then(message =>{
        console.log(`${file} saved`);
        })
      })
      .catch(e => console.error(e));
    };

    
let file = process.argv.slice(2).shift();
alterFile(file);
