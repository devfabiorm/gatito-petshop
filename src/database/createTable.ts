import ProviderModel from '../routes/providers/ProviderModelTable';

ProviderModel
  .sync()
  .then(() => console.log('Tabela criada com sucesso'))
  .catch(console.log);