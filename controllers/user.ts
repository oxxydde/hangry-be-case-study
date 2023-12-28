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

  const err: Error | null = dbCon.addUser(
    reqBody['name'],
    reqBody['email'],
    reqBody['birth_date'],
  );

  if (err != null) {
    sendError(res, 409, err.message);
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

  const result: Error | null = dbCon.updateUserById(
    reqBody['id'],
    reqBody['name'],
    reqBody['email'],
    reqBody['birth_date']
  );
  if (result != null) {
    switch (result.message) {
      case "409":
        sendError(res, 409, "New email you input are already existed, please use another email.");
        return;
        case "404":
        sendError(res, 404, "Invalid User ID, please check.");
        return;
    }
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