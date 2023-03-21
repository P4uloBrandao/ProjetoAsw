import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/httpService/http.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users:any[]=[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    // Define a URL do endpoint para a área de administração.
    this.httpService.setAdminUrl();

    // Busca a lista de usuários através do endpoint GET /users.
    this.httpService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  updateUser(user: any) {
    // Faz a atualização do usuário através do endpoint PUT /users/:userId.
    this.httpService.updateUser(user._id, user).subscribe(
      data => {
        console.log('Usuário atualizado com sucesso!');
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteUser(user: any) {
    // Faz a exclusão do usuário através do endpoint DELETE /users/:userId.
    this.httpService.deleteUser(user._id).subscribe(
      data => {
        console.log('Usuário excluído com sucesso!');
        // Remove o usuário da lista.
        const index = this.users.indexOf(user);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  setDefaultUrl() {
    // Define a URL do endpoint padrão (não admin).
    this.httpService.setDefaultUrl();
  }

}
