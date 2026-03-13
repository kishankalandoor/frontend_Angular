import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  // tslint:disable-next-line: typedef
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const user = this.authenticationService.authValue;
    if (user){
        return true;
    } else{
        this.router.navigate(['/auth/login']);
        return false;
    }
  }
}
