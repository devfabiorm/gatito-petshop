export default class NotFound extends Error {
  constructor() {
    super('Fornecedor não foi encontrado!');
    this.name = 'NotFound';
  }
}