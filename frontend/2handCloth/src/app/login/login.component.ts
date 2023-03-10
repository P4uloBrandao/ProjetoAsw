import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../shared/httpService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userId: any;
  user: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      this.http
        .login({
          email: email,
          password: password,
        })
        .subscribe((response) => {
          if (response.token) {
            console.log('Login bem-sucedido');
            // armazenar as credenciais de login do usuário e o token jwt no localStorage para manter o usuário logado entre as sessões
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ email: email, token: response.token })
            );
            // redirecionar para a página inicial ou outra página autorizada
          } else {
            console.log('Falha no login');
            // exibir mensagem de erro
          }
        });
    } else {
      console.log('Dados de login inválidos');
      // exibir mensagem de erro
    }
  }
}
