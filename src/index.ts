import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import config from 'config';

import NotFound from './errors/NotFound';
import routes from './routes';
import InvalidField from './errors/InvalidField';
import DataNotFound from './errors/DataNotFound';
import ValueNotSupported from './errors/ValueNotSupported';

interface ResponseError extends ErrorRequestHandler {
  message: string
}

const app = express();

app.use(express.json());
app.use(routes);
app.use((error: ResponseError, request: Request, response: Response, next: NextFunction) => {
  let status = 500;

  if(error instanceof NotFound) {
    status = 404;
  }

  if(error instanceof InvalidField || error instanceof DataNotFound) {
    status = 400;
  }

  if(error instanceof ValueNotSupported) {
    status = 406;
  }

  response.status(status).json({ message: error.message });
});

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'));