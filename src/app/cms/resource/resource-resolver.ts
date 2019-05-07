import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Resource} from './resource';
import {Observable} from 'rxjs';
import {CrudService} from '@jchpro/cms-core';

@Injectable({
  providedIn: 'root'
})
export class ResourceResolver implements Resolve<Resource> {

  constructor(
    private _crud: CrudService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resource> {
    return this._crud.readOne<Resource>(Resource, route.params.ResourceId);
  }

}
