import { Router } from 'express';

import providerRoutes from './providers';

const routes = Router();

routes.use('/api/providers', providerRoutes);

export default routes;

