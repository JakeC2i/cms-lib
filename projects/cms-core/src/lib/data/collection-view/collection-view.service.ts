import {Injectable} from '@angular/core';
import {CrudService} from '../crud.service';
import {CollectionViewController} from './collection-view-controller';

@Injectable({
  providedIn: 'root'
})
export class CollectionViewService {

  constructor(
    private _crud: CrudService
  ) { }

  getController<T>(
    dataSource: CollectionViewController.ApiCRUDModel<T> | CollectionViewController.DataResolver<T>,
    options?: CollectionViewController.Options
  ): CollectionViewController<T> {
    return new CollectionViewController<T>(this._crud, dataSource, options);
  }
}
