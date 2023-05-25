import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { HttpService } from "../../shared/httpService/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent implements OnInit, OnDestroy {
  public seller: any;
  private userToken: any;
  private subscriptions: any = [];
  private userInfos: any;
  public favoriteProducts: any;
  public isFavorite: any = false;
  public isOwnProduct:any=false;
  @Input() product: any;
  @Input() isCart: any = false;
  @Output() productAdded: EventEmitter<any> = new EventEmitter();

  constructor(private httpService: HttpService, private router: Router) {
    if (localStorage.getItem("currentUser")) {
      const ls = JSON.parse(localStorage.getItem("currentUser")!);
      this.userToken = ls.token;
    }
  }

  ngOnInit(): void {
    // this.seller = this.httpService.getUserById(this.product.seller);
    if (this.userToken) {
      this.httpService.getUserById(this.userToken).subscribe((data: any) => {
        this.userInfos = data.data;
        if(this.product.seller==this.userInfos._id){
          this.isOwnProduct=true;
        }
        console.log(this.isOwnProduct);
        
        this.favoriteProducts = data.data.favoritos;
        if (this.favoriteProducts) {
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
    } else {
      this.router.navigate(["/landing/login"]);
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
    } else {
      this.router.navigate(["/landing/login"]);
    }
  }

  public addProductToCart(): void {
    if (this.userToken) {
      this.subscriptions.push(
        this.httpService.addToCart(this.product._id, this.userToken).subscribe(
          (res: any) => {
            console.log(res);

            if (res.success) {
              console.log(res.data);
            }
          },
          (err: any) => {
            console.log(err);
          }
        )
      );
    }
  }

  comprarProduto() {
    if (!this.userToken) {
      this.router.navigate(["/landing/login"]);
      return;
    }
    this.router.navigate(["home/pagar"], { state: { produto: this.product } });
  }

  public goToChatRoom() {
    if (!this.userToken) {
      this.router.navigate(["/landing/login"]);
      return;
    }
    this.httpService.getUserByRealId(this.product.seller).subscribe((data: any) => {
      if (data.data.nome && data.data.email) {

        this.router.navigate(["home/chat-room"], {
          queryParams: { name: data.data.nome, email: data.data.email },
        });
      }
    });

  }
}
