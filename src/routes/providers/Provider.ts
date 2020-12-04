import ProviderTable from './ProviderTable';

import { IProvider } from './ProviderModelTable'

export default class Provider {
  id?: number | string;
  company?: string;
  email?: string;
  category?: string;
  createdAt?: string ;
  updatedAt?: string;
  version?: number;

  constructor({ id, company, email, category, createdAt, updatedAt } : IProvider) {
    this.id = id;
    this.company = company;
    this.email = email;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async create() {
    this.validate();
    const result = await ProviderTable.insert({
      company: String(this.company),
      email: String(this.email),
      category: String(this.category)
    });

    this.id = result.id;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }

  async load() {
    const provider = await ProviderTable.findById(Number(this.id));
    this.company = provider.company;
    this.email = provider.email;
    this.category = provider.category;
    this.createdAt = provider.createdAt;
    this.updatedAt = provider.updatedAt;
  }

  async update() {
    await ProviderTable.findById(Number(this.id));
    const fields: Array<keyof this> = ['company', 'email', 'category'];
    const dataToUpdate:any = {};

    fields.forEach((field) => {
      const value = this[field]
      
      if(typeof value === 'string' && value.length > 0) {
        dataToUpdate[field] = value
      }
    });

    if(Object.keys(dataToUpdate).length === 0) {
      throw new Error('Não foram fornecidos dados para atualizar');
    }

    await ProviderTable.update(Number(this.id), dataToUpdate);
  }

  remove() {
    return ProviderTable.remove(Number(this.id));
  }

  validate() {
    const fields: Array<keyof this> = ['company', 'email', 'category'];

    fields.forEach(field => {
      const value = this[field];

      if(typeof value !== 'string' || value.length === 0) {
        throw new Error(`O campo '${field}' está inválido`);
      }
    });
  }

}