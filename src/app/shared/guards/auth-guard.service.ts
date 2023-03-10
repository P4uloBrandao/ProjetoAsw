import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  
  constructor(private http: HttpService) { }

  canActivate() : boolean {
    // local
    if (localStorage.getItem('currentUser')) {
      const local: any = jwtDecode(
        JSON.parse(localStorage.getItem('currentUser')!).token
      );
      this.http.getUserById(local.id).subscribe((response) => {
        if (response.success== 'true') {
          return true;
        } else {
          return false;
        }
      });
      return false
  } else {
    return false;
  }
}

}

