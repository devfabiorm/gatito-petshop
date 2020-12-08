import { Router, Request, Response, NextFunction } from 'express';

import ProviderTable from './ProviderTable';
import Provider from './Provider';
import { ProviderSerializer } from '../../Serializer';

const providers = Router();

providers.get('/', async (request: Request, response: Response) => {
  const results = await ProviderTable.list();
  const serializer = new ProviderSerializer(response.getHeader('Content-Type') as string)
  response.status(200).send(serializer.serialize(results));
  //response.status(200).json(results);
})

providers.post('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const data = request.body;
    const provider = new Provider(data);
    await provider.create();
    const serializer = new ProviderSerializer(response.getHeader('Content-Type') as string)
    response.status(200).send(serializer.serialize(provider));
    // response.status(201).json(provider);
  } catch (error) {
   next(error);
  }
});

providers.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const provider = new Provider({ id });
    await provider.load()
    const serializer = new ProviderSerializer(response.getHeader('Content-Type') as string, ['email', 'createdAt', 'updatedAt', 'version'])
    response.status(200).send(serializer.serialize(provider));
    //response.status(200).json(provider);
  }catch(error) {
   next(error);
  }

});

providers.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const recievedData = request.body;
    const data = Object.assign({}, recievedData, { id });
    const provider = new Provider(data);
    await provider.update()
    response.status(204).end();
  } catch (error) {
   next(error);
  }
});

providers.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    const provider = new Provider({ id });
    await provider.load();
    await provider.remove();
    response.status(204).end();
  } catch (error) {
    next(error);
  }

});

export default providers;