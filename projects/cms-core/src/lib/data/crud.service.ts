import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {ApiCRUD} from "./api-crud";
import {Observable} from "rxjs";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import * as _ from 'lodash';
import {ConfigService} from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private static _getProtocolAssertCompliance<TClass = any>(klass: ApiCRUD.Class<TClass>): ApiCRUD.Protocol {
    const protocol = klass[ApiCRUD.CPK];
    if (!protocol) {
      throw new Error(`Class ${klass.name} is not API CRUD compliant`);
    }
    return protocol;
  }

  constructor(
    private _config: ConfigService,
    private _api: ApiService
  ) {}

  create<TClass = any, TInterface = any>(klass: ApiCRUD.Class<TClass>, stub: TInterface): Observable<TClass> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(klass);
    const path = protocol.paths.create();
    return this._api.post<TClass>(path, stub)
      .pipe(
        map(obj => {
          if (typeof protocol.deserializer === 'function') {
            return protocol.deserializer(obj);
          }
          return obj;
        })
      );
  }

  readOne<TClass = any>(klass: ApiCRUD.Class<TClass>, objOrId: TClass | string): Observable<TClass> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(klass);
    let path: string;
    if (typeof objOrId === 'string') {
      let dummyObj = {};
      dummyObj[protocol.idKey] = objOrId;
      path = protocol.paths.readOne(dummyObj);
    } else {
      path = protocol.paths.readOne(objOrId);
    }
    return this._api.get<TClass>(path)
      .pipe(
        map(obj => {
          if (typeof protocol.deserializer === 'function') {
            return protocol.deserializer(obj);
          }
          return obj;
        })
      );
  }

  readMany<TClass = any>(
    klass: ApiCRUD.Class<TClass>,
    params?: HttpParams
  ): Observable<TClass[]> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(klass);
    const path = protocol.paths.readMany();
    return this._api.get<TClass[]>(path, params)
      .pipe(
        map((objs) => {
          if (typeof protocol.deserializer === 'function') {
            return objs.map(protocol.deserializer);
          }
          return objs;
        })
      );
  }

  readManyPaged<TClass = any>(
    klass: ApiCRUD.Class<TClass>,
    paging: CrudService.PagingRequestParams,
    params?: HttpParams
  ): Observable<CrudService.PagedResponse<TClass>> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(klass);
    const path = protocol.paths.readMany();
    const mergedParams = _.extend({}, params || {}, paging);
    return this._api.getResponse<TClass[]>(path, mergedParams as any)
      .pipe(
        map(res => {
          let items = res.body;
          if (typeof protocol.deserializer === 'function') {
            items = items.map(protocol.deserializer);
          }
          const total = parseInt(res.headers.get(this._config.crudPagingTotalHeader));
          return {
            items: items,
            total
          };
        })
      )
  }

  update<TClass = any, TInterface = any>(instance: TClass, data: TInterface): Observable<TClass> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(instance.constructor as ApiCRUD.Class);
    const path = protocol.paths.update(instance);
    return this._api.put<TClass>(path, data)
      .pipe(
        map(obj => {
          if (typeof protocol.deserializer === 'function') {
            return protocol.deserializer(obj);
          }
          return obj;
        })
      );
  }

  delete<TClass = any>(instance: TClass): Observable<TClass> {
    const protocol = CrudService._getProtocolAssertCompliance<TClass>(instance.constructor as ApiCRUD.Class);
    const path = protocol.paths.delete(instance);
    return this._api.delete<TClass>(path)
      .pipe(
        map(obj => {
          if (typeof protocol.deserializer === 'function') {
            return protocol.deserializer(obj);
          }
          return obj;
        })
      );
  }
}

export namespace CrudService {

  export interface PagedResponse<T> {
    items: T[];
    total: number;
  }
  export interface PagingRequestParams {
    offset: number;
    limit: number;
  }
}
