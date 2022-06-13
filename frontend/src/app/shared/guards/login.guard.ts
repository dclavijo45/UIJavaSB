import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private _authService: AuthService,
        private _router: Router
    ){}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._authService.user) return true;

        this._router.navigateByUrl('/auth/login');
        return false;
    }

}
