import {Observable, Subject, Subscription} from "rxjs";
import {ApiCRUD} from "../api-crud";
import * as _ from 'lodash';
import {CrudService} from "../crud.service";
import {map, take} from "rxjs/operators";

export class CollectionViewController<T> {

  items: T[] = [];

  private _reloadSub: Subscription;
  private _reload$ = new Subject();

  newItems = new Subject();

  private _options: CollectionViewController.Options = {
    paging : {
      limit: 10,
      matLimitOptions: [5, 10, 20],
      matFirstLastButtons: true
    }
  };
  private _state: CollectionViewController.State = {
    paging: {
      offset: 0,
      limit: null,
      total: 0
    }
  };
  private _dataResolver: CollectionViewController.DataResolver<T>;

  private _reloadData() {
    this._dataResolver(this._state)
      .pipe(
        take(1)
      )
      .subscribe(result => {
        this.items = result.items;
        if (result.total !== null) {
          this._state.paging.total = result.total;
        }
        this.newItems.next();
      })
  }

  private _processDataSource(dataSource: CollectionViewController.ApiCRUDModel<T> | CollectionViewController.DataResolver<T>) {
    if (!dataSource) {
      throw new Error(`Data source must be either a Model or a DataResolver, got ${dataSource}`);
    }

    if (typeof dataSource[ApiCRUD.CPK] === 'object') {
      const ModelClass = dataSource as CollectionViewController.ApiCRUDModel<T>;
      this._dataResolver = (state: CollectionViewController.State) => {
        if (state.paging) {
          return this._crud.readManyPaged(ModelClass, {
            offset: state.paging.offset,
            limit: state.paging.limit
          });
        }
        return this._crud.readMany(ModelClass)
          .pipe(
            map(items => {
              return {
                items: items,
                total: null
              };
            })
          );
      };
      return;
    }
    if (typeof dataSource === 'function') {
      this._dataResolver = dataSource as CollectionViewController.DataResolver<T>;
      return;
    }

    throw new Error('Data source is of incompatible type');
  }

  private _processOptions(options?: CollectionViewController.Options) {
    if (options) {
      this._options = _.extend(this._options, options);
    }
    const opts = this._options;
    const state = this._state;

    // Paging
    if (opts.paging !== false && typeof opts.paging === 'object') {
      state.paging.limit = opts.paging.limit || state.paging.limit;
    } else {
      delete state.paging;
    }
  }

  private _bindEvents() {
    this._reloadSub = this._reload$.asObservable()
      .subscribe(() => {
        this._reloadData();
      });
  }

  constructor(
    private _crud: CrudService,
    dataSource: CollectionViewController.ApiCRUDModel<T> | CollectionViewController.DataResolver<T>,
    options?: CollectionViewController.Options
  ) {
    this._processDataSource(dataSource);
    this._processOptions(options);
    this._bindEvents();
  }

  get total(): number {
    return this._state.paging ? this._state.paging.total : null;
  }

  get paging(): CollectionViewController.PagingState {
    return this._state.paging;
  }

  get pagingOptions(): CollectionViewController.PagingOptions | false {
    return this._options.paging;
  }

  goToPage(pageIndex: number, pageSize?: number) {
    const paging = this._state.paging;
    if (!paging) return;
    if (typeof pageSize === 'number') {
      paging.limit = pageSize;
    }
    paging.offset = paging.limit * pageIndex;
    this._reload$.next();
  }

  reload() {
    this._reload$.next();
  }

  destroy() {
    this._reloadSub.unsubscribe();
  }
}

export namespace CollectionViewController {

  export type ApiCRUDModel<T> = ApiCRUD.Class<T>;
  export type DataResolver<T> = (state: State) => Observable<CrudService.PagedResponse<T>>

  export interface PagingOptions {
    limit?: number;
    matLimitOptions?: number[];
    matFirstLastButtons?: boolean;
  }

  export interface Options {
    paging?: PagingOptions | false;
    sorting?: any;
    filters?: any;
  }

  export interface PagingState {
    offset: number;
    limit: number;
    total: number;
  }

  export interface State {
    paging?: PagingState;
    sorting?: any;
    filters?: any;
  }
}
