import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    '[class.cms-module-view]': 'true'
  }
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
