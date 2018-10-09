import { Injector, Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHeaderResponse, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from '../auth/authentication.service';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
    constructor(private _injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authenticationService = this._injector.get(AuthenticationService);
        if (authenticationService.isAuthenticated()){
            const headers = new HttpHeaders({
                'x-access-token': authenticationService.user.token.toString(),
                'Content-Type': 'application/json'
              });

            const authRequest = req.clone({headers});
            return next.handle(authRequest);
        }else{
            return next.handle(req);
        }
    }
}