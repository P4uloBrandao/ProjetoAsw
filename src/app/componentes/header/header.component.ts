import { Component, Input } from '@angular/core';
import { HttpService } from '../../shared/httpService/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public totalItem: number = 0;
  public searchTerm!: any;
  public productList: any;
  public filterCategory: any;
  public products: any;
  private userToken: any;
  public userInfos: any;
  public favoriteProducts: any;
  public searchKey:any = '';
  public categoriesList: any;
  public marcaList:any;
  public AllproductsList:any;
  public isAuthenticated=false;
  public  userName:any;
  public categoriasPreferencias:any=[];
  public marcasPreferencias:any=[];
  public tamanhosPreferencias:any=[];



  public categList:any  = [];

  
  @Input() AUTHENTICATED: boolean =true;

  constructor(private httpService: HttpService,private router: Router) {
    if (localStorage.getItem('currentUser')) {
      const ls = JSON.parse(localStorage.getItem('currentUser')!);
      this.userToken = ls.token;
      this.isAuthenticated=true;
    }


  }

  ngOnInit(): void {
    if (this.userToken) {
      this.httpService.getUserById(this.userToken).subscribe((data: any) => {
        this.userInfos = data.data;
        this.favoriteProducts = data.data.favoritos;
        this.userName= data.data.nome.toUpperCase( );
        this.categoriasPreferencias=this.userInfos.preferencias.categorias
        console.log(this.categoriasPreferencias);
        
        this.marcasPreferencias=this.userInfos.preferencias.marca
        this.tamanhosPreferencias=this.userInfos.preferencias.tamanho
      });
    }
    this.httpService.getCategories().subscribe((res: any) => {
      this.categoriesList = res;
    
    });
    this.httpService.getMarcas().subscribe((res: any) => {
      this.marcaList = res;
    
    });
    
    this.httpService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.httpService.search.next(this.searchTerm);
  }
  
  getCategory(id:string){
    this.httpService.category.next(id);
  }

  getMarcabyId(id:string){
    this.httpService.getMarcaById(id);
  }
  isPrefered(id:string){
    console.log(this.categoriasPreferencias);
    
    return this.categoriasPreferencias.includes(id);
  }
  isPreferedM(id:string){
    return this.marcasPreferencias.includes(id);
  }
  existPreferencias(){
    return this.marcaList.length!=0 || this.categoriesList.length!=0 || this.tamanhosPreferencias.length!=0
  }
}
