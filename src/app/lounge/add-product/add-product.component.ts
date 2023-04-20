import { Component,OnInit} from '@angular/core';
import {HttpService} from '../../shared/httpService/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  files: File[] = [];
  imagesUrl: String[] =[];
  ProductForm!: FormGroup;
  public categories: any;
  public marcas: any;
  private subscriptionList: any = [];
  private local : any;
  private observable: any;

  constructor(private httpService :HttpService,private fb: FormBuilder,){
    this.local = localStorage.getItem('currentUser');
   
  }
  ngOnInit() {
    this.local = JSON.parse(this.local);
    this.ProductForm = this.fb.group({
      title: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      type: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      description: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      price: ['', [Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i), Validators.min(0), Validators.max(1000)]],
      size: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      condition: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      categories: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      brand: ['', Validators.required, Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)],
      images:[this.imagesUrl]// Adicionar o campo de upload de imagens
    });

    this.subscriptionList.push(
      this.httpService.getCategories().subscribe((response) => {
        this.categories = response;
      })
    );

    this.subscriptionList.push(
      this.httpService.getMarcas().subscribe((response) => {
        this.marcas = response;
      })
    );
  }

  onSelect(event:any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload(){
    if(!this.files[0]){
      alert('tem de selecionar uma imagem primeiro')
   }

   //upload image to cloadinary:
   const file_data=this.files[0]
   const data= new FormData();
   data.append('file',file_data);
   data.append('upload_preset','snquvr1g')
   data.append('cloud_name','dlbgyzjna')

  this.httpService.uploadImages(data).subscribe(response =>{
    if(response){
      console.log(response);
      this.imagesUrl.push(response.secure_url)
      }
  });
  console.log(this.imagesUrl);
  }

  onSubmit(){
    if(this.imagesUrl.length!=0){
      console.log("entrei no submit");
      
      if (this.ProductForm.valid){
        console.log("passei o form valid");
        
        // localStorage.setItem('users', JSON.stringify(users))
        // // this.route
        console.log(this.ProductForm)
        
        this.observable = this.httpService
          .addProduct(this.ProductForm.value,this.local.token)
          .subscribe(
            (res) => {
             console.log(res)
            },
            (err) => {
              console.log(err);
            }
          );
          
      }
    }else{
      alert("Adicione pelo menos uma imagem ao seu Produto")
    }

  }

}
