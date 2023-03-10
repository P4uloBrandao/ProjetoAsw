import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../shared/httpService/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', [Validators.required]],
        genero: ['', [Validators.required]],
        morada: ['', [Validators.required]],
        localidade: ['', [Validators.required]],
        codigoPostal: ['', [Validators.required]],
        telefone: [
          '',
          [
            Validators.required,
            Validators.min(100000000),
            Validators.max(999999999),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // localStorage.setItem('users', JSON.stringify(users))
      // // this.router.navigate(['/login'])
      // console.log('success');
      const emailControl = this.registrationForm.get('email');
      const emailValue = emailControl!.value.toLowerCase();
      emailControl!.patchValue(emailValue);
      
      this.http
        .register(this.registrationForm.value)
        .subscribe((res) => {
          console.log(res);
          this.router.navigate(['/login'])
        }, err => {
          console.log(err);
        });

    }
  }
}
