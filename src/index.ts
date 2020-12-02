import express from 'express';
import config from 'config';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'));