import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../httpService/http.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnDestroy{
  @Input() MENUS: any;
  @Input() AUTHENTICATED: boolean = false;
  public name: any;
  public subscriptions: any = [];

  constructor(private router: Router, private httpService: HttpService) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.subscriptions.push(httpService.getUserById(ls.token).subscribe((res: any) => {
        this.name = res.data.nome.split(' ')[0];
        
      }));
      
    } else {
      this.name = null;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['home']);
  }
}
