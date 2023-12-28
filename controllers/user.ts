import { IncomingMessage, ServerResponse } from 'http';
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
  dbCon.logAllUser();
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
  const reqBody = await bindBodyOrError(req, res, "id", "name", "email", "birth_date");
  if (reqBody == null) return;

  const result: boolean = dbCon.updateUserById(
    reqBody['id'],
    reqBody['name'],
    reqBody['email'],
    reqBody['birth_date']
  );
  if (!result) {
    sendError(res, 400, "Invalid User ID, please check.");
    return;
  }

  sendSuccess(res, {
    "status": `Profile of User ID ${reqBody['id']} has been updated successfully.`
  });
  dbCon.logAllUser();
}

const deleteUserById: Function = async (req: IncomingMessage, res: ServerResponse) => {
  const reqBody = await bindBodyOrError(req, res, "id");
  if (reqBody == null) return;

  if (!dbCon.deleteUserById(reqBody.id)) {
    sendError(res, 503, "Invalid User ID, please check.");
    return;
  };
  sendSuccess(res, {
    "status": `User ID ${reqBody.id} has been deleted successfully.`
  });
  dbCon.logAllUser();
}

export default handleUser;