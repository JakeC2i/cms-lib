import {Directive, Input, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {CollectionViewController} from "./collection-view-controller";
import {MatPaginator} from "@angular/material";

@Directive({
  selector: '[cmsCollectionViewMatPaginator]'
})
export class CollectionViewMatPaginatorDirective implements OnDestroy {

  private _ctrlSubscribed: boolean = false;
  private _subs: Subscription[] = [];

  private _assignOptionsOneTime(options: CollectionViewController.PagingOptions) {
    if (options.matLimitOptions) {
      this._matPaginator.pageSizeOptions = options.matLimitOptions;
    }
    if (options.matFirstLastButtons) {
      this._matPaginator.showFirstLastButtons = true;
    }
  }

  private _assignPaginationInfo(ctrl: CollectionViewController<any>) {
    const paging = ctrl.paging;
    if (!paging) {
      console.warn('This instance of CollectionViewController does not support paging');
      return
    }
    this._matPaginator.pageSize = paging.limit;
    this._matPaginator.length = paging.total;
  }

  @Input('cmsCollectionViewMatPaginator') set collectionViewMatPaginator(ctrl: CollectionViewController<any>) {

    // Validate
    if (!(ctrl instanceof CollectionViewController)) {
      throw new Error(`Directive proCollectionViewMatTable accepts only CollectionViewController, got ${ctrl}`)
    }
    if (!(this._matPaginator instanceof MatPaginator)) {
      throw new Error(`Directive proCollectionViewMatTable should be used only on MatPaginator`)
    }

    const options = ctrl.pagingOptions;
    if (!options) return;

    this._assignPaginationInfo(ctrl);
    if (!this._ctrlSubscribed) {
      this._assignOptionsOneTime(options);
      this._ctrlSubscribed = true;
      this._subs.push(
        ctrl.newItems
          .asObservable()
          .subscribe(() => {
            this._assignPaginationInfo(ctrl);
          }),
        this._matPaginator.page
          .asObservable()
          .subscribe((page) => {
            if (!ctrl.paging) return;
            ctrl.goToPage(page.pageIndex, page.pageSize);
          })
      );
    }
  }

  constructor(
    private _matPaginator: MatPaginator
  ) { }

  ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
