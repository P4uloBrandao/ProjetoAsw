import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  private userId: any;
  private user: any;
  private observable: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
        ],
      ],
    });
  }
  ngOnDestroy(): void {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      this.observable = this.http
        .login({
          email: email,
          password: password,
        })
        .subscribe((response) => {
          if (response.token) {
            console.log('Login bem-sucedido');
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ email: email, token: response.token })
            );
            this.router.navigate(['/lounge/user']);
          } else {
            console.log('Falha no login');
          }
        });
    } else {
      console.log('Dados de login inválidos');
    }
  }
}
