import { Component, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent implements OnDestroy {
  public favoritos: any;
  private userToken: any;
  public subscriptions: any = [];
  constructor(private httpService: HttpService) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
    if (this.userToken) {
      let lista:any = [];
      this.subscriptions.push(
        this.httpService
          .getFavoritesProducts(this.userToken)
          .subscribe((res: any) => {

            if (res.success && res.favorites.length > 0) {
              
              res.favorites.forEach((element: any) => {
                this.subscriptions.push(
                  this.httpService
                    .getProductById(element._id)
                    .subscribe((res: any) => {
                      if (res.success) {
                        lista.push(res.data);
                      }
                    })
                );
              });
              this.favoritos = lista;
            }
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }

  public onFavoriteRemove(event:any): void {
    this.favoritos = this.favoritos.filter((item:any) => item._id !== event);
  }
}
