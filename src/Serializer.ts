import ValueNotSupported from "./errors/ValueNotSupported";
import Provider from "./routes/providers/Provider";
import { ProviderModel } from "./routes/providers/ProviderModelTable";

export class Serializer {
  protected contentType!: string;
  protected publicFields!: Array<keyof Provider> | any;

  json(data: Provider) {
    return JSON.stringify(data);
  }

  serialize(data: Provider | ProviderModel[] | object) {
    if(this.contentType === 'application/json') {
      return this.json(
        this.filter(data)
      )
    }

    throw new ValueNotSupported(this.contentType);
  }

  dataFilter(data: Provider) {
    const newData: any = {};

    this.publicFields.forEach((field: keyof Provider) => {
      if (data.hasOwnProperty(field)) {
        newData[field] = data[field];
      }
    });

    return newData;
  }

  filter(data: any) {
    if(Array.isArray(data)) {
      data = data.map(item => {
        return this.dataFilter(item);
      });
    } else {
      data = this.dataFilter(data);
    }

    return data;
  }
}

export class ProviderSerializer extends Serializer {
  private _fields: Array<keyof Provider> = ['id', 'company', 'category'];
  
  constructor(contentType: string, extraFields?: Array<keyof Provider>) {
    super();
    this.contentType = contentType;
    this.publicFields = this._fields.concat(extraFields || []);
  }
}

export class ErrorSerializer extends Serializer {
  constructor(contentType: string, extraFields?: Array<string>) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      'message'
    ].concat(extraFields || []);
  }
}

export const acceptedFormats = ['application/json'];