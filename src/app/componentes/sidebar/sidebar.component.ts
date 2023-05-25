import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent{


  @Input() MENUS: any;
  @Input() AUTHENTICATED: boolean = false;

  public name: any;
  public subscriptions: any = [];





  menuSelecionado = 'Home';

  constructor(private router: Router){

  }


  botaoClick(botao: string){
    this.menuSelecionado = botao;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/landing/home']);
  }
}
