import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/httpService/http.service';
import {CoreService} from 'src/app/shared/core/core.service';
@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _empService: HttpService,
    private _dialogRef: MatDialogRef<UserAddEditComponent>,
    private coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      nome: '',
      email: '',
      dataNascimento: '',
      genero: '',
      morada: '',
      localidade: '',
      codigoPostal: '',
      telefone: '',
      password:'password123'
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      console.log(this.empForm.value)
      if (this.data) {   
        console.log(this.data._id)    
        this._empService
          .updateUser(this.empForm.value,this.data._id)
          .subscribe({

            next: (val: any) => {
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.register(this.empForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('User adicionado com sucesso');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}