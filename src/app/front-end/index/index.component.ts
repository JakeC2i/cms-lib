import { Component, OnInit } from '@angular/core';
import {LoginService} from '@jchpro/cms-core';

@Component({
  selector: 'pro-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    public login: LoginService
  ) { }

  ngOnInit() {
  }

}
