import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private http: HttpService, private router: Router) {}

  canActivate(): boolean {
    // local
    if (localStorage.getItem('currentUser')) {
      const local: any = 
        JSON.parse(localStorage.getItem('currentUser')!).token

      this.http.getUserById(local).subscribe((response) => {
        if (response.success) {
          return true;
        } else {
          this.router.navigate(['home']);

          return false;
        }
      });
      return true;
    } else {
      this.router.navigate(['home']);

      return false;
    }
  }
}
