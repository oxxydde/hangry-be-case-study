import http from 'http';

const sendSuccess: Function = (res: http.ServerResponse, data: JSON) => {
  res.statusCode = 200;
  res.write(JSON.stringify(Object.assign({}, { success: true }, data)));
  res.end();
}

const sendError: Function = (res: http.ServerResponse, errorCode: number, message: string) => {
  res.statusCode = errorCode;
  res.write(JSON.stringify({
    success: false,
    message: message
  }));
  res.end();
};

module.exports.sendSuccess = sendSuccess;
module.exports.sendError = sendError;
