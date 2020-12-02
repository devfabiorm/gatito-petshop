import { Router, Request, Response } from 'express';

import ProviderTable from './ProviderTable';
import Provider from './Provider';

const providers = Router();

providers.get('/', async (request: Request, response: Response) => {
  const results = await ProviderTable.list();
  
  response.json(results);
})

providers.post('/', async (request: Request, response: Response) => {
  const data = request.body;
  const provider = new Provider(data);
  await provider.create();
  response.json(provider);
});

export default providers;