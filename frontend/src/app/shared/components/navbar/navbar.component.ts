import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/authService.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    get isLogin(): Observable<boolean> {
        return this._authService.isLogin;
    }

    constructor(
        private _authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    logout(): void {
        this._authService.logout();
    }
}
