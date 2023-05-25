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
  public tamanhos:any=[];
  public tipoArtigo:any=[];
  public submitted = false;
  constructor(private httpService :HttpService,private fb: FormBuilder,){
    this.local = localStorage.getItem('currentUser');
     this.tamanhos= [
      'XS', 'S', 'M', 'L', 'XL', 'XXL','XXXL','XXXXL',
      '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
      '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57',
      'Tamanho Unico' 
    ];
    this.tipoArtigo=[
    "Roupa","Sapato","Acessórios","Cuidados Pessoais","Malas","Beleza","Brinquedos","Cuidados de Bébé","Veiculos de brincar",
    "Material Escolar","Artigos para casa","Outros"]
  }
  ngOnInit() {
    this.local = JSON.parse(this.local);
    this.ProductForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.max(100000)]],
      size: ['', Validators.required],
      condition: ['', Validators.required],
      categories: ['', Validators.required],
      brand: ['', Validators.required],
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
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSubmit() {
    this.submitted = true;
      //upload image to Cloudinary:
      if(this.files.length!=0){
        const file_data = this.files[0]
        const data = new FormData();
        data.append('file', file_data);
        data.append('upload_preset', 'snquvr1g')
        data.append('cloud_name', 'dlbgyzjna')
      
        this.httpService.uploadImages(data).subscribe(response => {
          if (response) {
            console.log(response);
            this.imagesUrl.push(response.secure_url)
            try {
              this.observable = this.httpService.addProduct(this.ProductForm.value, this.local.token).subscribe(
                (res) => {
                  console.log(res)
                  // Reset form on successful submission
                  this.ProductForm.reset();
                  this.files=[];
                  this.submitted=false;
                },
                (err) => {
                  console.log(err);
                  throw err;
                }
              );
            } catch (err) {
              console.log(err);
              throw err;
            }
          }
        }, (err) => {
          console.log(err);
          // Return error message to frontend
          throw err;
        });
      }else{
        alert("é necessário adicionar uma imagem...")
      }
    
  }
}
