import http from 'http';
import ping from '../controllers/ping';
import jsonTest from '../controllers/jsontest';
const {sendError, sendSuccess} = require('../utils/sendResponse');

export function handleRoute(req: http.IncomingMessage, res: http.ServerResponse) {
  const path = req.url;
  // routes here
  switch (path) {
    case '/ping':
      ping(req, res);
      break;
    case '/jsontest':
      jsonTest(req, res);
      break;
    default:
      sendError(res, 404, "Endpoint not found.")
      break;
  }
}