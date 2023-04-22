import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  public products: any;
  private userToken: any;
  private userInfos: any;
  public favoriteProducts: any;

  constructor(private httpService: HttpService) {
    this.httpService.getProducts().subscribe((data: any) => {
      this.products = data;
    });

    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }

    if (this.userToken) {
      this.httpService.getUserById(this.userToken).subscribe((data: any) => {
        this.userInfos = data.data;
        this.favoriteProducts = data.data.favoritos;
      });
    }
  }
}
