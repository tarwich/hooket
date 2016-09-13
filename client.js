'use strict';

// Libraries
const WebSocket = require('ws');

let logError = error => {
  if (error) console.error(error.stack || error);
};

module.exports = options => {
  try {
    let socket = new WebSocket('ws://' + options.server);

    socket.on('error', error => logError);

    socket.on('open', error => {
      console.log('Connected to ' + options.server);
      if (error) logError(error);
      else socket.send('something', logError);
    });

    socket.on('message', function(data, flags) {
      console.log('received:', data);
    });
  }
  catch (error) {
    logError(error);
  }
};
