import { IncomingMessage, ServerResponse } from 'http';
const { sendError, sendSuccess } = require('../utils/sendResponse');

export default function (req: IncomingMessage, res: ServerResponse) {
  if (req.method != 'GET') {
    sendError(res, 405, "Invalid method.");
    return;
  }
  sendSuccess(res, {
    'message': 'Pong'
  });
}