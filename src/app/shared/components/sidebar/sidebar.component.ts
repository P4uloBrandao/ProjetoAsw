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
  public name : any;

  constructor(private router: Router) { 
    if (localStorage.getItem('currentUser')) {
      this.name = JSON.parse(localStorage.getItem('currentUser')!).name;
    } else {
      this.name = null;
    }
  }

  public logout () {
    localStorage.removeItem('currentUser');
    this.router.navigate(['home']);
  }
}
