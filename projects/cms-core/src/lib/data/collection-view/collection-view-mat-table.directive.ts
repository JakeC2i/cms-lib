import {Directive, Input, OnDestroy} from '@angular/core';
import {MatTable} from '@angular/material';
import {CollectionViewController} from './collection-view-controller';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[cmsCollectionViewMatTable]'
})
export class CollectionViewMatTableDirective implements OnDestroy {

  // TODO sorting events
  private _ctrlSubscribed: boolean = false;
  private _newItemsSub: Subscription;

  private _assignItems(ctrl: CollectionViewController<any>) {
    this._matTable.dataSource = ctrl.items;
  }

  @Input('cmsCollectionViewMatTable') set collectionViewMatTable(ctrl: CollectionViewController<any>) {

    // Validate
    if (!(ctrl instanceof CollectionViewController)) {
      throw new Error(`Directive proCollectionViewMatTable accepts only CollectionViewController, got ${ctrl}`)
    }
    if (!(this._matTable instanceof MatTable)) {
      throw new Error(`Directive proCollectionViewMatTable should be used only on MatTable`)
    }

    this._assignItems(ctrl);
    if (!this._ctrlSubscribed) {
      this._ctrlSubscribed = true;
      this._newItemsSub = ctrl.newItems
        .asObservable()
        .subscribe(() => {
          this._assignItems(ctrl);
        });
    }
  }

  constructor(
    private _matTable: MatTable<any>
  ) { }

  ngOnDestroy(): void {
    this._newItemsSub.unsubscribe();
  }

}
