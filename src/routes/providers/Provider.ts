import { Model } from 'sequelize/types';
import ProviderTable from './ProviderTable';

import { IProvider } from './ProviderModelTable'

export default class Provider {
  id?: number;
  company!: string;
  email!: string;
  category!: string;
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
    const result = await ProviderTable.insert({
      company: this.company,
      email: this.email,
      category: this.category
    });

    this.id = result.id;
    this.createdAt = result.createdAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }

}