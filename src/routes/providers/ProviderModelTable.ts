import * as Sequelize from 'sequelize';
import database from '../../database';

export interface IProvider {
  id?: number;
  company: string;
  email: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  version?: number;
}

export interface ProviderModel extends Sequelize.Model<IProvider>, IProvider {

}

const columns = {
  company: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  }  ,
  category: {
    type: Sequelize.ENUM('ração', 'briquedos'),
    allowNull: false,
  }
}

const options = {
  freezeTableName: true,
  tableName: 'providers',
  timestamps: true,
  version: true
}

export default database.define<ProviderModel, IProvider>('provider', columns, options);
