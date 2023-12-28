import http from 'http';
import url from 'url';
const {sendSuccess, sendError} = require('../utils/sendResponse');

const bindBodyOrError: Function = async (req: http.IncomingMessage, res: http.ServerResponse, ...params: string[]): Promise<Object | null> => {
  const bodyBuffer: Promise<string> = new Promise((resolve, reject) => {
    let buf: Uint8Array[] = [];
    req.on('data', (chunk) => {
      buf.push(chunk);
    })
      .on('end', () => {
        resolve(Buffer.concat(buf).toString())
      })
      .on('error', (error) => {
        reject(error.message)
      })
  })
  
  let body: any = {};
  switch (req.method) {
    case 'GET':
      body = url.parse(req.url!, true).query;
      // get params later
      break;
    case 'POST':
      body = JSON.parse(await bodyBuffer);
      break;
  }

  let invalidParams: Array<string> = [];

  params.forEach((param) => {
    if (body[param] == null || body[param] == undefined) {
      invalidParams.push(param);
    }
  });

  if (invalidParams.length > 0) {
    sendError(res, 400, `Missing value of ${invalidParams.join(", ")}`);
    return null;
  }

  return body;
}

export default bindBodyOrError;