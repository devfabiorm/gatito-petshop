import Model from './ProviderModelTable';
import { IProvider } from './ProviderModelTable';

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

  async findById(id: number) {
    const found = await Model.findOne({
      where: { id }
    });

    if(!found) {
      throw new Error('Fornecedor não encontrado');
    }

    return found;
  },

  update(id: number, data: IProvider) {
    return Model.update(
      data, { where: {id} }
    )
  },

  remove(id: number) {
    return Model.destroy({
      where: {id}
    })
  }
}