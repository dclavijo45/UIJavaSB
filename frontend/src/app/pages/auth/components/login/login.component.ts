import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authService.service';

import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    loading: boolean;

    subscription$: Subscription;

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _notifierService: NotifierService,
        private _router: Router
    ) {
        this.formLogin = this._fb.group({
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        });

        this.loading = false;

        this.subscription$ = this._authService.isLogin.subscribe(isLogin => {
            if (isLogin) {
                this._router.navigateByUrl('/profile');
            };
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

    login(event: Event): void {
        event.preventDefault();

        if (this.formLogin.invalid) {
            this.formLogin.markAllAsTouched();
            return;
        };

        this.loading = true;

        this._authService.login(this.formLogin.value).subscribe({
            next: (user) => {
                this.loading = false;
                this._authService.setLogin(user);
                this._router.navigateByUrl('/profile');
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;

                this._notifierService.notify('default', err.error.message);
            }
        });
    }

}
