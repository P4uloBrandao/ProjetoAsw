import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminID = '641a479a29813981ef5b007e';
  private local: any;
  constructor() {
    this.local = localStorage.getItem('currentUser');
  }

  public checkAdmin(): boolean {
    if (this.local) {
      const id: any = jwtDecode(JSON.parse(this.local).token);
      if (id.id === this.adminID) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
}
