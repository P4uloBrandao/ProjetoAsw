import { Component } from '@angular/core';
import { HttpService } from 'src/app/shared/httpService/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  public userInfo: any;
  public local: any;
  constructor(http: HttpService) {
    this.local = (localStorage.getItem('currentUser'));
    if (this.local) {
      this.local = JSON.parse(this.local);
      http.getUserById(this.local.token).subscribe((response) => {
        this.userInfo = response.data;
      });
    }
  }
}
