import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    #dispathLogin: BehaviorSubject<boolean>;

    user: IUser;

    isLogin: Observable<boolean>;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.user = null!;

        this.#dispathLogin = new BehaviorSubject<boolean>(false);

        this.isLogin = this.#dispathLogin.asObservable();

        const userLC = localStorage.getItem('user');

        if (userLC) {
            this.user = JSON.parse(userLC) as IUser;
            this.#dispathLogin.next(true);
        };
    }

    login(user: IUser): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiUrl}/login`, user);
    }

    register(user: IUser): Observable<IUser> {
        return this._http.post<IUser>(`${environment.apiUrl}/register`, user);
    }

    update(user: IUser): Observable<IUser> {
        const userLC = localStorage.getItem('user');
        const token: number = JSON.parse(userLC!).token;

        return this._http.put<IUser>(`${environment.apiUrl}/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            user
        });
    }

    setLogin(user: IUser): void {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        this.#dispathLogin.next(true);
    }

    logout(): void {
        this.user = null!;
        localStorage.removeItem('user');
        this.#dispathLogin.next(false);

        this._router.navigateByUrl('/auth/login');
    }

    removeAccount(): Observable<void> {
        const userLC = localStorage.getItem('user');
        const token: number = JSON.parse(userLC!).token;

        return this._http.delete<void>(`${environment.apiUrl}/user/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
}
