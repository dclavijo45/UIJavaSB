import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authService.service';

import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    formRegister: FormGroup;

    loading: boolean;

    constructor(
        private _Fb: FormBuilder,
        private _authService: AuthService,
        private _notifierService: NotifierService,
        private _router: Router
    ) {
        this.formRegister = this._Fb.group({
            name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
            email: ['', [Validators.required, Validators.email]],
            country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            numberTelephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                Validators.pattern(/^[0-9]+$/)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
        });

        this.loading = false;
    }

    ngOnInit(): void {
    }

    register(event: Event): void {
        event.preventDefault();

        if (this.formRegister.invalid) {
            this.formRegister.markAllAsTouched();
            return;
        };

        this.loading = true;

        this._authService.register(this.formRegister.value).subscribe({
            next: (user) => {
                this.loading = false;
                this._notifierService.notify('default', 'User created successfully, please login');
                this._router.navigateByUrl('/profile');
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;

                this._notifierService.notify('default', err.error.message);
            }
        });
    }
}
