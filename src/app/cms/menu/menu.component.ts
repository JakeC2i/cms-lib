import { Component, OnInit } from '@angular/core';
import {LoginService, ThemeService} from '@jchpro/cms-core';

@Component({
  selector: 'pro-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public login: LoginService,
    public theme: ThemeService
  ) { }

  ngOnInit() {
  }

}
