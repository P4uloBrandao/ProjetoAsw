import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/AdminService/admin.service';
import { MenusSidebar } from '../shared/configs/menus.configs';

@Component({
  selector: 'app-lounge',
  templateUrl: './lounge.component.html',
  styleUrls: ['./lounge.component.scss'],
})
export class LoungeComponent implements OnInit {
  public menusLounge: any;
  public local: any;

  constructor(private admin: AdminService) {
    if (this.admin.checkAdmin()) {
      this.menusLounge = MenusSidebar.loungeAdmin;
    } else {
      this.menusLounge = MenusSidebar.loungeUser;
    }
  }

  ngOnInit(): void {

  }
}
