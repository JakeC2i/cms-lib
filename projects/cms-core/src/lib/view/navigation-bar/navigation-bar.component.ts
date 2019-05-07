import {Component, Input, OnInit} from '@angular/core';
import {NavigationBarLink} from "./navigation-bar-link";

@Component({
  selector: 'cms-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() links: NavigationBarLink[] = [];

  constructor() { }

  ngOnInit() {
  }

}
