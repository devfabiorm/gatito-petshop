import ValueNotSupported from "./errors/ValueNotSupported";

export class Serializer {
  public contentType!: string;

  json(data: object) {
    return JSON.stringify(data);
  }

  serialize(data: object) {
    if(this.contentType === 'application/json') {
      return this.json(data)
    }

    throw new ValueNotSupported(this.contentType);
  }
}

export class ProviderSerializer extends Serializer {
  constructor(contentType: string) {
    super();
    this.contentType = contentType;
  }
}

export const acceptedFormats = ['application/json'];