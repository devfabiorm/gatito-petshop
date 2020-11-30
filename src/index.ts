import express from 'express';
import config from 'config';

const app = express();

app.use(express.json());

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'));