import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService,
    private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAuthenticated()
    .then(
      (authenticated:boolean) =>{
        if(authenticated){
          return true;
        }
        this.router.navigate(['/'])
      }
    )
  }
}
