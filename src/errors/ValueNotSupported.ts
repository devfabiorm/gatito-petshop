export default class ValueNotSupported extends Error {
  constructor(contentType: string) {
    super(`O tipo de conteúdo ${contentType} não é suportado`);
    this.name = 'ValueNotSupported';
  }
}