import {IncomingMessage, ServerResponse} from 'http';
import bindBodyOrError from '../utils/binds';
import dbCon from '../models/db';
import url from 'url';
const { sendError, sendSuccess } = require('../utils/sendResponse');

const handleUser: Function = async (req: IncomingMessage, res: ServerResponse) => {
  switch (req.method) {
    case 'POST':
      addUser(req, res);
      break;
    case 'GET': 
      findUserById(req, res);
      break;
    case 'PUT': 
      updateUserById(req, res);
      break;
    case 'DELETE': 
      deleteUserById(req, res);
      break;
    default:
      sendError(res, 405, "Invalid method.");
      break;
  }
}

const addUser: Function = async (req: IncomingMessage, res: ServerResponse) => {
  const reqBody = await bindBodyOrError(req, res, "name", "email", "birth_date");
  if (reqBody == null) return;

  if (!dbCon.addUser(
    reqBody['name'],
    reqBody['email'],
    reqBody['birth_date'], 
  )) {
    sendError(res, 503, "There is a problem with the server, please try again later.");
    return;
  };
  sendSuccess(res, {
    "status": "User has been created."
  });
}

const findUserById: Function = async (req: IncomingMessage, res: ServerResponse) => {
  const reqBody = await bindBodyOrError(req, res, "id");
  if (reqBody == null) return;

  const foundUser = dbCon.findUserById(reqBody.id);
  if (foundUser == null) {
    sendError(res, 404, "User not found.");
    return;
  }
  sendSuccess(res, foundUser);
}

const updateUserById: Function = async (req: IncomingMessage, res: ServerResponse) => {

}

const deleteUserById: Function = async (req: IncomingMessage, res: ServerResponse) => {

}

export default handleUser;