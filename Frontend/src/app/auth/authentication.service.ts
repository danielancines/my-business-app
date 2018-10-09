import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './model/IUser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient: HttpClient, private _router: Router) { }

  get user(): IUser {
    return JSON.parse(localStorage.getItem('user'));
  }

  login(email: String, password: String): Observable<IUser> {
    return this._httpClient.post<any>(`${environment.baseApiUrl}/auth`, { email: email, password: password })
      .pipe(map((response) => {
        const user: IUser = {
          _id: response.user._id,
          name: response.user.name,
          lastName: response.user.lastName,
          email: response.user.email,
          token: response.token
        };

        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  me(): Observable<IUser> {
    return this._httpClient.get<any>(`${environment.baseApiUrl}/auth/me/${this.user._id}`)
      .pipe(map((response) => {
        const user: IUser = {
          _id: response.user._id,
          name: response.user.name,
          lastName: response.user.lastName,
          email: response.user.email,
          token: response.token
        };
        
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this._router.navigate(['auth/login']);
  }

  isAuthenticated(): boolean {
    if (!this.user || !this.user.token) {
      this.logout();
      return false;
    }

    if (this.tokenIsValid()) {
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  private tokenIsValid(): boolean {
    const decoded = jwt_decode(this.user.token);
    if (decoded.exp === undefined) return false;

    const date = new Date(0);
    const expirationDate = date.setUTCSeconds(decoded.exp);
    if (expirationDate === undefined) return false;

    return date.valueOf() > new Date().valueOf();
  }
}
