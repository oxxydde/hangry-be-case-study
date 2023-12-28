import http from 'http';
import url from 'url';
import ping from '../controllers/ping';
import handleUser from '../controllers/user';
const log = require('../middleware/logger');
const {sendError} = require('../utils/sendResponse');

export function handleRoute(req: http.IncomingMessage, res: http.ServerResponse) {
  // perform logging
  const uri = url.parse(req.url!);
  log(req, uri.pathname);
  // routes here
  switch (uri.pathname) {
    case '/ping':
      ping(req, res);
      break;
    case '/user':
      // Handle user here, CRUD will be based on HTTP Method
      handleUser(req, res);
      break;
    default:
      sendError(res, 404, "Endpoint not found.")
      break;
  }
}