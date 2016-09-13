'use strict';

// Libraries
const minimist = require('minimist');

// Variables
const args = minimist(process.argv.slice(2), {
  defaults: {
    port: 8080,
  }
});

if (args._[0] === 'server') require('./server')(args);
else if (args._[0] === 'client') require('./client')(args);

else {
  console.error(`
  Usage: ${process.argv.slice(0, 2).join(' ')} [server | client]
    server:   Specifies that this should be the tunnel server
    --port:   Specify the port that the server should run on
    client:   Specifies that this should be the tunnel client
    --server: Specify the server that the client should connect to
`
  );
}
