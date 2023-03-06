import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento:['',[Validators.required]],
        genero: ['',[Validators.required]],
        morada: ['',[Validators.required]],
        localidade: ['',[Validators.required]],
        codigoPostal: ['',[Validators.required]],
        telefone: ['',[Validators.required, Validators.min(111111111), Validators.max(999999999)]],
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
    if(this.registrationForm.valid){
      let users=[];
      let localS= localStorage.getItem('users')
      if(localS){
        users= JSON.parse(localS)
      }
      users.push(this.registrationForm.value)
      localStorage.setItem('users', JSON.stringify(users))
      this.router.navigate(['/login'])
    }
    
  }
}
