import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registrationForm!: FormGroup;
  private observable: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpService
  ) {}
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        nome: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        dataNascimento: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        genero: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        morada: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        localidade: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        codigoPostal: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
          ],
        ],
        telefone: [
          '',
          [
            Validators.required,
            Validators.min(100000000),
            Validators.max(999999999),
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
        confirmPassword: [
          '',
          Validators.required,
          Validators.pattern(/^(?:(?!<script)[\s\S])*$/i),
        ],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnDestroy(): void {
    if (this.observable) {
      this.observable.unsubscribe();
    }
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

      this.observable = this.http
        .register(this.registrationForm.value)
        .subscribe(
          (res) => {
            this.router.navigate(['/login']);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
