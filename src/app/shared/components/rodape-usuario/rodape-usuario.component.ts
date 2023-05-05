import { Component } from '@angular/core';
import { HttpService } from '../../httpService/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rodape-usuario',
  templateUrl: './rodape-usuario.component.html',
  styleUrls: ['./rodape-usuario.component.scss']
})
export class RodapeUsuarioComponent {
  public name: any;
    public subscriptions: any = [];
    public usuario:any;

    constructor(private router: Router,private httpService: HttpService) {
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

    logout() {
      localStorage.removeItem('currentUser');
      this.router.navigate(['home']);
    }
}
