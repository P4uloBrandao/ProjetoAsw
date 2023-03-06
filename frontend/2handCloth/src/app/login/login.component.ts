import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private localS: any;
  private users: any;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.localS = localStorage.getItem('users');
  }
  ngOnInit(): void {
    if(this.localS){
      this.users = JSON.parse(this.localS);
    }
    this.loginForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: any) {
    const email = formGroup.get('confirmPassword').value;
    const password = formGroup.get('password').value;
    //Fazer a lógica do login aqui
    return true;
  }

  onSubmit() {
    console.log("Entrou");
    
  }
}
