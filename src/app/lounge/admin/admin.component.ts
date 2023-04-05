import { Component, OnInit } from '@angular/core';



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

