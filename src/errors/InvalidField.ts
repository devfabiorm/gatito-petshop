import Provider from "../routes/providers/Provider";

export default class InvalidField extends Error{
  constructor(field: keyof Provider) {
    super(`O campo '${field}' está inválido`);
    this.name = 'IvalidField'
  }
}