import { Component, OnInit } from '@angular/core';
import {CrudService, CollectionViewController, CollectionViewService, DialogService, Dialog} from '@jchpro/cms-core';
import {filter, switchMap} from 'rxjs/operators';
import {Resource} from '../resource';
import {Resource as ResourceData} from '../../../../../server/_types';

@Component({
  selector: 'pro-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  host: {
    '[class.cms-module-view]': 'true'
  }
})
export class ResourceListComponent implements OnInit {

  columns: string[] = ['name', 'created', 'value', 'actions'];

  resources: CollectionViewController<Resource>;

  constructor(
    private _crud: CrudService,
    private _dialog: DialogService,
    private _collectionView: CollectionViewService
  ) {

    this.resources = this._collectionView.getController<Resource>(Resource, {paging: {limit: 10}});
  }

  ngOnInit() {
    this.resources.reload();
  }

  openDeleteDialog(resource: Resource) {
    this._dialog.yesNoQuestion(`Are you sure you want to delete "${resource.name}"?`, 'Confirmation')
      .pipe(
        filter(res => res === Dialog.Result.Yes),
        switchMap(() => {
          return this._crud.delete<Resource>(resource);
        })
      )
      .subscribe(() => {
        this.resources.reload();
      });
  }

  openCreateDialog() {
    this._dialog.textInput(
      'Resource',
      '',
      'Enter resource name',
      'New resource',
      (dialog) => !dialog.textInput.value
    )
      .pipe(
        filter(name => name !== null),
        switchMap(name => {
          return this._crud.create<Resource, ResourceData>(Resource, {
            _id: undefined,
            created: undefined,
            name,
            value: 0
          });
        })
      )
      .subscribe(() => {
        this.resources.reload();
      });
  }
}
