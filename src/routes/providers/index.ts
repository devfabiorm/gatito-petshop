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

providers.get('/:id', async (request: Request, response: Response) => {
  try {
    console.log('cheguei')
    const { id } = request.params;
    const provider = new Provider({ id });
    await provider.load()
    response.json(provider);
  }catch(error) {
    response.status(400).json({
      message: error.message
    });
  }

});

providers.put('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const recievedData = request.body;
    const data = Object.assign({}, recievedData, { id });
    const provider = new Provider(data);
    await provider.update()
    response.status(201).end();
  } catch (error) {
    response.status(400).json({
      message: error.message
    })
  }
});
export default providers;