import { HttpService } from '../../shared/httpService/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {
  public product:any;
  public userInfos:any;
  public userToken: any;

  constructor(private httpService: HttpService,private route: ActivatedRoute,private router:Router) { 
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
    }
}

  ngOnInit() {

    if (this.userToken) {
      this.httpService.getUserById(this.userToken).subscribe((data: any) => {
        this.userInfos = data.data;
      });
    this.product = history.state.produto;
    console.log(this.product);
  }

  }
  
  efetuarPagamento(){
    if(this.product.seller=== this.userInfos._id){
      alert("Impossivel comprar o seu proprio produto")
    }else{
      this.httpService.buyProductsFromCart(this.product._id,this.userInfos._id,this.product.price).subscribe((response: any) => {
        console.log(response);
        if (response.status(200)) {
          alert("Compra efetuada com sucesso");
          this.router.navigate(['home/pagar'])
        }else{
          alert("nao foi possivel  efetuar a Compra")
        }
      });
    }
  }

}
