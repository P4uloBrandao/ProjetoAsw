import { Component, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
})
export class CarrinhoComponent implements OnDestroy {
  private userToken: any;
  private subscriptions: any = [];
  public products: any;
  public totalPrice: number = 0;
  public comprado: boolean = false;
  constructor(private httpService: HttpService) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
    httpService.getProductsFromCart(this.userToken).subscribe((res: any) => {
      if (res.success) {
        let lista: any = [];
        res.carrinho.forEach((element: any) => {
          httpService.getProductById(element._id).subscribe((res: any) => {
            if (res.success) {
              lista.push(res.data);
              this.totalPrice += Number(res.data.price);
            }
          });
        });
        this.products = lista;
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }

  public buyNow(): void {
    if (this.userToken) {
      this.products.forEach((element: any) => {
        this.subscriptions.push(
          this.httpService
            .buyProductsFromCart(element._id, this.userToken, element.price)
            .subscribe((res: any) => {
              if (res.success) {
                console.log(res.data);
                this.comprado = true;
              }
            })
        );
      });
    }
  }
}
