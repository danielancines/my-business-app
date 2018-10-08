import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading: Boolean = false;
    errorAtLogin: Boolean = false;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authenticationService: AuthenticationService,
        private _router: Router,
        private _cookieService: CookieService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                }
            }
        };
    }

    set rememberMeOptionValue(value: boolean) {
        alert(value);
        if (!value) {
            this._cookieService.delete('rememberMeOptionValue');
            this._cookieService.delete('userLogin');
        } else {
            this._cookieService.set('rememberMeOptionValue', String(value));
        }
    }

    get rememberMeOptionValue(): boolean {
        return this._cookieService.check('rememberMeOptionValue');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: [this.getUserLogin(), [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    getUserLogin(): string {
        if (this._cookieService.check('rememberMeOptionValue')) {
            return this._cookieService.get('userLogin');
        }
    }

    saveUserLogin(userLogin: string) {
        if (this._cookieService.check('userLogin')) this._cookieService.delete('userLogin');
        this._cookieService.set('userLogin', userLogin);
    }

    executeLogin(): void {
        const email = this.loginForm.get('email').value;
        this.saveUserLogin(email);
        this.loading = true;
        this.errorAtLogin = false;
        this._authenticationService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .subscribe(user => {
                this._router.navigate(['home']);
                this.loading = false;
            },
                (error) => {
                    this.loading = false;
                    this.errorAtLogin = true;
                });
    }
}
