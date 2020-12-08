import jsontoxml from 'jsontoxml';

import ValueNotSupported from "./errors/ValueNotSupported";
import Provider from "./routes/providers/Provider";
import { ProviderModel } from "./routes/providers/ProviderModelTable";

export class Serializer {
  protected contentType!: string;
  protected publicFields!: Array<keyof Provider> | any;
  protected tagSimple!: string;
  protected tagPlural!: string;

  json(data: Provider) {
    return JSON.stringify(data);
  }

  xml(data: any) {
    let tag = this.tagSimple;

    if(Array.isArray(data)) {
      tag = this.tagPlural;
      data = data.map((item: Provider) => {
        return {
          [this.tagSimple] : item

        }
      });
    }

    return jsontoxml({ [tag]: data });
  }

  serialize(data: Provider | ProviderModel[] | object) {

    data = this.filter(data);

    if(this.contentType === 'application/json') {
      return this.json(data as Provider); 
    }

    if(this.contentType === 'application/xml') {
      return this.xml(data as Provider);
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
    this.tagSimple = 'provider';
    this.tagPlural = 'providers'
  }
}

export class ErrorSerializer extends Serializer {
  constructor(contentType: string, extraFields?: Array<string>) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      'message'
    ].concat(extraFields || []);
    this.tagSimple = 'error';
    this.tagPlural = 'errors';
  }
}

export const acceptedFormats = ['application/json', 'application/xml'];