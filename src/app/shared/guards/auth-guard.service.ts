import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpService } from '../httpService/http.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, OnDestroy{
  private observable: any;
  constructor(private http: HttpService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.observable) {
      this.observable.unsubscribe();
    }
  }

  canActivate(): boolean {
    if (localStorage.getItem('currentUser')) {
      const local: any = 
        JSON.parse(localStorage.getItem('currentUser')!).token

      this.observable=this.http.getUserById(local).subscribe((response) => {
        if (response.success) {
          return true;
        } else {
          this.router.navigate(['home']);
          localStorage.removeItem('currentUser');
          return false;
        }
      }, 
      (error) => {
        this.router.navigate(['home']);
        localStorage.removeItem('currentUser');
        return false;
      });
      return true;
    } else {
      this.router.navigate(['home']);

      return false;
    }
  }
}
