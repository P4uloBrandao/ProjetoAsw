import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public products: any;

  constructor( private httpService: HttpService) {
    this.httpService.getProducts().subscribe((data: any) => {
      this.products = data;
      
    });
  }


}
