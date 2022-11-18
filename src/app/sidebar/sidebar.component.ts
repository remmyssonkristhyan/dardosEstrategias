import { Component, Input, OnInit } from '@angular/core';
import { menuList } from './menu-list';
import { tileLayer } from 'leaflet';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  sideMenu = menuList;
  collapse = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.collapse = !this.collapse;
  }
}
