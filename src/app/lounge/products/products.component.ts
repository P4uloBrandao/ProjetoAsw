import { Component, OnInit} from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productList : any ;
  public filterCategory : any
  public products: any;
  private userToken: any;
  private userInfos: any;
  public favoriteProducts: any;
  public searchKey:string="";
  
 

  constructor(private httpService: HttpService) {
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
  
  ngOnInit(): void {
    this.httpService.getProducts().subscribe((res: any) => {
      this.productList = res;
      this.filterCategory = res;
      console.log(this.productList)
    });

    this.httpService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.categories== category || category==''){
        return a;
      }
    })
    
  }
  


}
