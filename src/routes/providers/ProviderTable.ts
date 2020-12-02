import Model from './ProviderModelTable';

interface IInsert {
  company: string;
  email: string;
  category: string;
}

export default {
  list() {
    return Model.findAll();
  },

  insert(provider: IInsert) {
    return Model.create(provider);
  },
}