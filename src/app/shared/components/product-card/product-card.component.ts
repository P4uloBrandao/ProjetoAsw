import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  private userInfos: any;
  public favoriteProducts: any;
  public isFavorite: any = false;
  @Input() product: any;
  @Input() isCart: any = false;
  @Output() productAdded: EventEmitter<any> = new EventEmitter();

  constructor(private httpService: HttpService) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
  }

  ngOnInit(): void {
    // this.seller = this.httpService.getUserById(this.product.seller);
    if (this.userToken) {
      this.httpService.getUserById(this.userToken).subscribe((data: any) => {
        this.userInfos = data.data;
        this.favoriteProducts = data.data.favoritos;
        if (this.favoriteProducts) {
          console.log(this.favoriteProducts);
          console.log(this.product._id);

          if (this.favoriteProducts.includes(this.product._id)) {
            this.isFavorite = true;
          }
        }
      });
    }
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
              this.isFavorite = false;
              this.productAdded.emit(this.product._id);
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
            console.log(res);
            
            if (res.success) {
              console.log(res.data);
            }
          }, (err: any) => {
            console.log(err);
          }
      ));
    }
  }
}
