import { Router, Request, Response } from 'express';

import ProviderTable from './ProviderTable';
import Provider from './Provider';

const providers = Router();

providers.get('/', async (request: Request, response: Response) => {
  const results = await ProviderTable.list();
  
  response.status(200).json(results);
})

providers.post('/', async (request: Request, response: Response) => {
  try {
    const data = request.body;
    const provider = new Provider(data);
    await provider.create();
    response.status(201).json(provider);
  } catch (error) {
    response.status(400).json({
      message: error.message
    });
  }
});

providers.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const provider = new Provider({ id });
    await provider.load()
    response.status(200).json(provider);
  }catch(error) {
    response.status(404).json({
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
    response.status(204).end();
  } catch (error) {
    response.status(400).json({
      message: error.message
    })
  }
});

providers.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const provider = new Provider({ id });
    await provider.load();
    await provider.remove();
    response.status(204).end();
  } catch (error) {
    response.status(404).json({
      message: error.message
    });
  }

});

export default providers;