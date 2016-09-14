'use strict';

// Libraries
const config       = require('config').loadConfig('.');
const express      = require('express');
const log          = require('log')('express');
// const childLog     = require('log')('ssh');
// const childProcess = require('child_process');

// Variables
const app = express();

// let child = childProcess.spawn('ssh', [
//   '-i', 'id_rsa',
//   'proxy@45.55.69.10',
//   '-N',
//   '-R', '8080:localhost:' + config.server.port]
// );

// child.stdout.on('data', data => childLog.info(data));
// child.stderr.on('data', data => childLog.error(data));

app.all('*', (request, response) => {
  console.log(require('util').inspect(request, {colors: true}));
  response.send('Hi there');
});

app.listen(config.server.port, () => {
  log.info('Server is listening on port', config.server.port);
});
