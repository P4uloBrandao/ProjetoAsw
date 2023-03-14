import { Component } from '@angular/core';
import { MenusSidebar } from '../shared/configs/menus.configs';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss']
})
export class LoungeComponent {
  public menusLounge = MenusSidebar.lounge;
}
