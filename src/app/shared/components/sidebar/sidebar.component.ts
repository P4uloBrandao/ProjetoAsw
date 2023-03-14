import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() MENUS : any;
  @Input() AUTHENTICATED : boolean = false;

  constructor(private router: Router) { }

  public logout () {
    localStorage.removeItem('currentUser');
    this.router.navigate(['home']);
  }
}
