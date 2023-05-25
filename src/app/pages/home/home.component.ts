import { Component } from '@angular/core';
import { MenusSidebar } from 'src/app/shared/configs/menus.configs';
import { SidebarComponent } from 'src/app/componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public user=MenusSidebar.user
}
