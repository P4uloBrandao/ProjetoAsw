import { Component, OnInit } from '@angular/core';
import { MenusSidebar } from '../shared/configs/menus.configs';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent {
  public menusInitial = MenusSidebar.initial;
}
