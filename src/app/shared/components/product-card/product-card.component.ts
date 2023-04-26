import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../httpService/http.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public seller: any;
  private userToken: any;
  private subscriptions: any = [];
  @Input() product: any;
  @Input() isFavorite: any = false;
  @Input() isCart: any = false;
  

  constructor(private httpService: HttpService) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
  }

  ngOnInit(): void {
    // this.seller = this.httpService.getUserById(this.product.seller);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }

  public addFavorite(): void {
    if (this.userToken) {
      this.subscriptions.push(
        this.httpService
          .addFavProduct(this.product._id, this.userToken)
          .subscribe((res: any) => {
            if (res.success) {
              console.log(res.data);
              this.isFavorite = true;
            }
          })
      );
    }
  }

  public removeFavorite(): void {
    if (this.userToken) {
      this.subscriptions.push(
        this.httpService
          .removeFavProduct(this.product._id, this.userToken)
          .subscribe((res: any) => {
            if (res.success) {
              console.log(res.data);
              this.isFavorite = false;
            }
          })
      );
    }
  }

  public addProductToCart(): void {
    if (this.userToken) {
      this.subscriptions.push(
        this.httpService
          .addToCart(this.product._id, this.userToken)
          .subscribe((res: any) => {
            if (res.success) {
              console.log(res.data);
            }
          })
      );
    }
  }
}
