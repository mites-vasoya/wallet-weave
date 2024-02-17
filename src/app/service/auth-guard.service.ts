import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(public authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // loggedIn = this.authService.loggedIn;
    this.authService.isLoggedIn().then((isLoggedIn) => {
      if(isLoggedIn) {
        console.log("User is Logged In");
      } else {
        this.router.navigate(['login'])
      }
    })
    return true;
  }
}
