'use strict';

// Libraries
const WebSocketServer = require('ws').Server;

let logError = error => {
  if (error) console.error(error.stack || error);
};

module.exports = options => {
  try {
    const wss = new WebSocketServer({port: options.port}, logError);

    console.log('Server listening on port', options.port);

    wss.on('error', logError);

    wss.on('connection', ws => {
      ws.on('message', message => {
        console.log('received: %s', message);
      });

      ws.send('the answer');
    });
  }
  catch (error) {
    logError(error);
  }
};
