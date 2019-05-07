import { Component, OnInit } from '@angular/core';
import {Resource} from '../resource';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CrudService, ToastService, ErrorService} from '@jchpro/cms-core';

@Component({
  selector: 'pro-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss'],
  host: {
    '[class.cms-module-view]': 'true'
  }
})
export class ResourceEditComponent implements OnInit {

  resource: Resource;

  listRouterLink = '/panel/resource';

  form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _crud: CrudService,
    private _toast: ToastService,
    private _error: ErrorService
  ) {
    this._route.data
      .subscribe((data: {resource: Resource}) => {
        this.resource = data.resource;
        this._initializeForm();
      });
  }

  private _initializeForm() {
    const resource = this.resource;
    this.form = this._formBuilder.group({
      name: [resource.name, Validators.required],
      value: [resource.value, Validators.required]
    });
  }

  ngOnInit() {
  }

  onFormSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    this._crud.update<Resource>(this.resource, data)
      .subscribe(resource => {
        this.resource = resource;
        this._initializeForm();
        this._toast.toast(`Resource updated successfully`);
      }, err => {
        this._error.throwDialog(err.error || err);
      });
  }
}
