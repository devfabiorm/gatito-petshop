import Model from './ProviderModelTable';
import { IProvider } from './ProviderModelTable';
import NotFound from '../../errors/NotFound';

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
      throw new NotFound();
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