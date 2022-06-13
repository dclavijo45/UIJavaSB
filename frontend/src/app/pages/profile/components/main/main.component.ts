import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/authService.service';

import { NotifierService } from 'angular-notifier';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    formUpdate: FormGroup;

    loading: boolean;

    get user(): IUser {
        return this._authService.user;
    }

    constructor(
        private _fb: FormBuilder,
        private _authService: AuthService,
        private _notifierService: NotifierService
    ) {
        this.formUpdate = this._fb.group({
            name: [this.user.name, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            lastname: [this.user.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
            username: [this.user.username, [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            country: [this.user.country, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            city: [this.user.city, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            numberTelephone: [this.user.numberTelephone, [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                Validators.pattern(/^[0-9]+$/)]],
            password: [null, [Validators.minLength(6), Validators.maxLength(12)]]
        });

        this.loading = false;
    }

    ngOnInit(): void {
    }

    update(event: Event): void {
        event.preventDefault();

        if (this.formUpdate.invalid) {
            this.formUpdate.markAllAsTouched();
            return;
        };

        this.loading = true;

        this._authService.update(this.formUpdate.value).subscribe({
            next: (user) => {
                this.loading = false;
                this._notifierService.notify('default', 'User updated successfully');
                this._authService.setLogin(user);
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;

                console.log(err);


                this._notifierService.notify('default', err.error.message);
            }
        });
    }

    removeAccount(): void {
        this.loading = true;

        this._authService.removeAccount().subscribe({
            next: (user) => {
                this.loading = false;
                this._notifierService.notify('default', 'User account removed successfully');
                this._authService.logout();
            },
            error: (err: HttpErrorResponse) => {
                this.loading = false;
                this._notifierService.notify('default', err.error.message);
            }
        })
    }

}
