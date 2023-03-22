import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { MenusSidebar } from '../shared/configs/menus.configs';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss'],
})
export class LoungeComponent implements OnInit {
  public menusLounge: any;
  public local: any;
  private adminID = '641a479a29813981ef5b007e';

  constructor() {
    this.local = localStorage.getItem('currentUser');
    
  }

  ngOnInit(): void {
    if (this.local) {
      const id : any = jwtDecode(JSON.parse(this.local).token);
      if (id.id === this.adminID) {
        this.menusLounge = MenusSidebar.loungeAdmin;
      } else {
        this.menusLounge = MenusSidebar.loungeUser;
      }
    }
  }
}
