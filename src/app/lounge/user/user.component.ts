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
  private subscriptionList: any = [];
  constructor(private http: HttpService, private formBuilder: FormBuilder) {
    this.local = localStorage.getItem('currentUser');
  }

  ngOnInit(): void {
    if (this.local) {
      this.local = JSON.parse(this.local);
      this.subscriptionList.push(
        this.http.getUserById(this.local.token).subscribe((response) => {
          this.userInfo = response.data;
          this.userForm = this.formBuilder.group({
            nome: [this.userInfo.nome, [Validators.required]],
            email: [
              this.userInfo.email,
              [Validators.required, Validators.email],
            ],
            dataNascimento: [
              this.userInfo.dataNascimento,
              [Validators.required],
            ],
            genero: [this.userInfo.genero, [Validators.required]],
            morada: [this.userInfo.morada, [Validators.required]],
            localidade: [this.userInfo.localidade, [Validators.required]],
            codigoPostal: [this.userInfo.codigoPostal, [Validators.required]],
            telefone: [
              this.userInfo.telefone,
              [
                Validators.required,
                Validators.min(100000000),
                Validators.max(999999999),
              ],
            ],
            categorias: ['', []],
            marca: ['', []],
            tamanho: ['', []],
          });
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
          console.log(response);
        });
      
    }
  }
}
