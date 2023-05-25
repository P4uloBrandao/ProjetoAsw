import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { HttpService } from "../httpService/http.service";

@Injectable({
  providedIn: "root",
})
export class UnauthenticadedGuard implements CanActivate {
  constructor(private router: Router,  private httpService: HttpService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("currentUser")) {
      this.router.navigate(["lounge"]);
      return false;
    } else {
      return true;
    }
  }
}
