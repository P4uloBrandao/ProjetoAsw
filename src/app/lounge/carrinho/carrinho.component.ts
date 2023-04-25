import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent {
  private userToken: any;
  public carrinho: any;
  constructor(private httpService: HttpService) { 
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
    httpService.getProductsFromCart(this.userToken).subscribe((res: any) => {
      this.carrinho = res.data;
      console.log(this.carrinho);
      
    });

  }
}
