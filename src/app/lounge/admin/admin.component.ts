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

export class AdminComponent {
  
}

