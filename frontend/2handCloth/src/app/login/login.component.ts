import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../shared/httpService/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    const email = this.loginForm.get('email');
    const password = this.loginForm.get('password');
    if (email && password) {
      this.http
        .post('http://localhost:8080/login', this.loginForm.value)
        .subscribe((res) => {
          if (res == '200') {
            console.log('entrou')
          } else {
            console.log('Não entrou');
          }
        });
    } else {
      console.log('Não entrou');
      //Fzer tratamento de erros
    }
  }
}
