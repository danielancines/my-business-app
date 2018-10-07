import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../model/IUser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  login(email: String, password: String): Observable<IUser> {
    return this._httpClient.post<any>('https://businessapi.now.sh/api/v1/auth', { email: email, password: password })
      .pipe(map((response) => {
        const user: IUser = {
          _id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          token: response.token
        };
        return user;
      }));
  }
}
