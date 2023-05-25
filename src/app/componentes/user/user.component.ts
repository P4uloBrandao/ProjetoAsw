import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public userInfo: any;
  public local: any;
  public userForm!: FormGroup;
  public categories: any;
  public marcas: any;
  public tamanhos:any;
  private subscriptionList: any = [];
  public produtos:any=[];
  public produtosVenda:any=[];
  public produtosVendidos:any=[];
  public produtosComprados:any=[];
  public menuSelecionado:String='à venda';

  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.local = localStorage.getItem('currentUser');
    this.tamanhos= [
      'XS', 'S', 'M', 'L', 'XL', 'XXL','XXXL','XXXXL',
      '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
      '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57',
      'Tamanho Unico' 
    ];
  }

  ngOnInit(): void {
    if (this.local) {
      this.local = JSON.parse(this.local);
      this.subscriptionList.push(
        this.http.getUserById(this.local.token).subscribe((response) => {
          this.userInfo = response.data;
          this.userForm = this.formBuilder.group({
            nome: [
              this.userInfo.nome,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            email: [
              this.userInfo.email,
              [
                Validators.required,
                Validators.email,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            dataNascimento: [
              this.userInfo.dataNascimento,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            genero: [
              this.userInfo.genero,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            morada: [
              this.userInfo.morada,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            localidade: [
              this.userInfo.localidade,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            codigoPostal: [
              this.userInfo.codigoPostal,
              [
                Validators.required,
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            telefone: [
              this.userInfo.telefone,
              [
                Validators.required,
                Validators.min(100000000),
                Validators.max(999999999),
                Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
              ],
            ],
            categorias: ['', [Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)]],
            marca: ['', [Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)]],
            tamanho: ['', [Validators.pattern(/^(?:(?!<script)[\s\S])*$/i)]],
          });
          this.userForm.patchValue({
            categorias: this.userInfo.preferencias.categorias,
            marca: this.userInfo.preferencias.marca,
            tamanho: this.userInfo.preferencias.tamanho
          });

          this.subscriptionList.push(
            this.http.getUserProducts(this.userInfo._id).subscribe((response) => {
              this.produtosVenda = response;
              this.produtos=this.produtosVenda
            })
          );
          this.subscriptionList.push(
            this.http.getUserProductsVendidos(this.userInfo._id).subscribe((response) => {
              this.produtosVendidos = response;
            })
          );
          this.subscriptionList.push(
            this.http.getUserProductsComprados(this.userInfo._id).subscribe((response) => {
              this.produtosComprados = response;
            })
          );
        })

        
      );
 
    
    }
    this.subscriptionList.push(
      this.http.getCategories().subscribe((response) => {
        this.categories = response;
      })
    );

    this.subscriptionList.push(
      this.http.getMarcas().subscribe((response) => {
        this.marcas = response;
      })
    );
   
  
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((subscription: any) => {
      subscription.unsubscribe();
    });
  }

  public updateUser() {
    const formData = this.userForm.value;

    if (this.userForm.valid) {
      this.http
        .updateUserInfo(formData, this.local.token)
        .subscribe((response) => {
          if (response.success) {
            alert('Atualizado com sucesso!');
          } else {
            alert('Algo correu mal. Por favor, tente novamente.');
          }
        });
    }
  }

  public mostrarProdutos(tipo:String){
    this.menuSelecionado = tipo;
    if(tipo===' à venda'){
        this.produtos=this.produtosVenda
    }
    if(tipo=='vendidos'){
      this.produtos=this.produtosVendidos
    }
    if(tipo=='comprados'){
      this.produtos=this.produtosComprados
    }
  }
}
