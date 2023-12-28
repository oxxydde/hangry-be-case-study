import {IncomingMessage} from 'http';
import url from 'url';

function log(req: IncomingMessage, path: string) {
  // Gin golang style for logging
  console.log(`${req.method} | ${req.socket.remoteAddress} | ${(new Date()).toISOString()} | ${path}`);
}

module.exports = log;