export namespace ApiCRUD {

  // Constructor protocol key
  export const CPK = 'apiCrudProtocol';

  export type PathResolver<T> = (obj?: T) => string;

  export interface Protocol<T = any> {
    prefix: string;
    idKey: string;
    paths: {
      create: PathResolver<T>;
      readOne: PathResolver<T>;
      readMany: PathResolver<T>;
      update: PathResolver<T>;
      delete: PathResolver<T>;
    },
    deserializer?: Deserializer<T>;
  }

  export function Compliant(protocol: Protocol) {
    return function(target: any) {
      target[CPK] = protocol;
      return target;
    };
  }

  export function getBasicProtocol(prefix: string, idKey: string = '_id'): Protocol {
    return {
      prefix,
      idKey,
      paths: {
        create: () => `/${prefix}`,
        readOne: (obj) => `/${prefix}/${obj[idKey]}`,
        readMany: () => `/${prefix}`,
        update: (obj) => `/${prefix}/${obj[idKey]}`,
        delete: (obj) => `/${prefix}/${obj[idKey]}`,
      }
    };
  }

  export type Class<T = any> = (new(...args: any[]) => T);
  export type Deserializer<T = any> = (obj: any) => T;
}
