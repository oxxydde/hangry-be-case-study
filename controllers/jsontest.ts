import { IncomingMessage, ServerResponse } from 'http';
import bindBodyOrError from '../utils/binds';
const { sendError, sendSuccess } = require('../utils/sendResponse');

export default async function jsonTest(req: IncomingMessage, res: ServerResponse) {
  if (req.method != 'POST') {
    sendError(res, 405, "Invalid method.");
    return;
  }
  const reqBody = await bindBodyOrError(req, res, "title");
  if (reqBody == null) return;
  sendSuccess(res, {
    "isiString": reqBody
  });
}