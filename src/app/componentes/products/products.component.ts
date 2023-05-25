import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { HttpService } from "src/app/shared/httpService/http.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() pageType: any;
  public category: any;

  public AllproductList: any;
  public filterCategory: any;
  public productCategory: any;
  public products: any;
  private userToken: any;
  private userInfos: any;
  public favoriteProducts: any;
  public searchKey: string = "";
  public subscrptions: any[] = [];

  constructor(private httpService: HttpService) {
    if (localStorage.getItem("currentUser")) {
      const ls = JSON.parse(localStorage.getItem("currentUser")!);
      this.userToken = ls.token;
    }

    if (this.userToken) {
      this.subscrptions.push(
        this.httpService.getUserById(this.userToken).subscribe((data: any) => {
          this.userInfos = data.data;
          this.favoriteProducts = data.data.favoritos;
        })
      );
    }
  }
  ngOnInit(): void {
    if (this.pageType === "favoritos") {
      this.subscrptions.push(
        this.httpService
          .getFavoritesProducts(this.userToken)
          .subscribe((res: any) => {
            this.products = res;
            this.filter();
          })
      );
    } else if (this.pageType === "home") {
      this.subscrptions.push(
        this.httpService
          .getPreferedProducts(this.userToken)
          .subscribe((res: any) => {
            this.products = res;
            this.filter();
          })
      );
    } else {
      this.subscrptions.push(
        this.httpService.getProducts().subscribe((res: any) => {
          this.products = res;
          this.filter();
        })
      );
    }
    this.subscrptions.push(
      this.httpService.search.subscribe((val: any) => {
        this.searchKey = val;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscrptions.forEach((subscription) => subscription.unsubscribe());
  }

  filter() {
    this.subscrptions.push(
      this.httpService.category.subscribe((val: any) => {
        this.category = val;
        this.filterCategory = this.products.filter((a: any) => {
          if (a.categories == this.category || this.category == "") {
            return a;
          }
        });
      })
    );
  }
}
