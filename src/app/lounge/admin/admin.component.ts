import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';
import { CommonModule } from '@angular/common';
import { MatTable } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';



export interface UserElement {
  id:String,
  nome:string;
  email: string;
  genero: string;
  morada:string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  filterForm: FormGroup;
  displayedColumns: string[] = ['id','nome', 'email', 'genero','morada','eliminar'];
  dataSource: UserElement[] = [];

  // ViewChild decorator to get a reference to the MatTable component in the template
  @ViewChild('table') table: any;

  constructor(private userService: HttpService) {
    this.filterForm = new FormGroup({
      nome: new FormControl(''),
      email: new FormControl(''),
      genero: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.dataSource = users.map((user: any) => {
        return {
          id:user._id,
          nome: user.nome,
          email: user.email,
          genero: user.genero,
          morada:user.morada,
        };
      });
    });
  }

  deleteUser(id: string) {
    if (window.confirm('Tem certeza de que deseja excluir este utilizador?')) {
      this.userService.deleteUserById(id).subscribe(() => {
        // Remove the user from the dataSource
        const index = this.dataSource.findIndex(user => user.id=== id);
        if (index >= 0) {
          this.dataSource.splice(index, 1);
          window.location.reload();
        }
      });

    }
  }


  aplicarFiltros() {

    const filterNomeValue = this.filterForm.controls['nome'].value;
    const filterEmailValue = this.filterForm.controls['email'].value;
    const filterGeneroValue = this.filterForm.controls['genero'].value;

    // filter the data based on the filter field values
    let filteredData = this.dataSource.filter((user) => {
      return (
        (filterNomeValue === "" || user.nome.toLowerCase().includes(filterNomeValue.toLowerCase())) &&
        (filterEmailValue === "" || user.email.toLowerCase().includes(filterEmailValue.toLowerCase())) &&
        (filterGeneroValue === "" || user.genero.toLowerCase() === filterGeneroValue.toLowerCase())
      );
    });


    // set the filtered data as the new data source for the table
    this.dataSource = filteredData;
    this.table.renderRows(); // update the table with the filtered data

  }
}

