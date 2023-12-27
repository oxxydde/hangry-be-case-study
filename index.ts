import http from 'http';
import { handleRoute } from './routes/routes';

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  handleRoute(req, res);
})

const port = 8080;

server.listen(port, () => console.log(`Server listening on ${port}`));