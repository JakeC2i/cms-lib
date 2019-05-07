import * as _ from 'lodash';
import {ApiCRUD} from '@jchpro/cms-core';
import {Resource as ResourceData} from '../../../../server/_types';

const crudProtocol: ApiCRUD.Protocol<Resource> = ApiCRUD.getBasicProtocol('resource');
crudProtocol.deserializer = (obj: ResourceData): Resource => {
  if (!obj) return;
  const instance = new Resource();
  _.merge(instance, obj);
  if (obj.created) {
    instance.created = new Date(obj.created);
  }
  return instance;
};

@ApiCRUD.Compliant(crudProtocol)
export class Resource implements ResourceData {
  _id: string;
  created: Date;
  name: string;
  value: number;
}
