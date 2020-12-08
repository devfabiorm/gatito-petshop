import express, { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import config from 'config';

import NotFound from './errors/NotFound';
import routes from './routes';
import InvalidField from './errors/InvalidField';
import DataNotFound from './errors/DataNotFound';
import ValueNotSupported from './errors/ValueNotSupported';
import { acceptedFormats, ErrorSerializer } from './Serializer';

interface ResponseError extends ErrorRequestHandler {
  message: string
}

const app = express();

app.use(express.json());
app.use((request, response, next) => {
  let requestedFormat = request.header('Accept') as string;

  if(requestedFormat === '*/*') {
    requestedFormat = 'application/json';
  }

  if(acceptedFormats.indexOf(requestedFormat) === -1){
    response.status(406).end();
    return;
  }

  response.setHeader('Content-Type', requestedFormat);
  next();
});

app.use(routes);

app.use((error: ResponseError, request: Request, response: Response, next: NextFunction) => {
  const serializer = new ErrorSerializer(response.getHeader('Content-Type') as string)
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
  
  response.status(status).send(serializer.serialize(error));
  //response.status(status).json({ message: error.message });
});

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'));