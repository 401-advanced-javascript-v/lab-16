'use strict';

const events = require('./events.js');



const saveFile = (file) => {
   console.log(`${file} saved`); 
}

const handleError = (err)=> {
    console.error(err);
}

events.on('save', saveFile);
events.on('getError', handleError);