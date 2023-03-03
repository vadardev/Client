import { Injectable } from "@angular/core";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthRequestModel } from "src/app/common/services/auth/models/auth.request";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { AuthResponseModel } from "./models/auth.response";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        private socialAuthService: SocialAuthService,
        private userService: UserService,
        private router: Router) {

        console.log('test');

        if (!this.userService.isUserAuthenticated()) {

            console.log("AuthService")

            this.socialAuthService.authState.subscribe((user) => {
                console.log(user);

                const auth: AuthRequestModel = {
                    idToken: user.idToken
                }

                console.log(auth);

                this.validateExternalAuth(auth);
            })
        }
    }

    public externalLogin = (route: string, body: AuthRequestModel) => {
        return this.http.post<AuthResponseModel>(this.createCompleteRoute(route, environment.urlAddress), body);
    }

    public signOutExternal = () => {
        this.socialAuthService.signOut();
    }

    private createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }


    private validateExternalAuth(auth: AuthRequestModel) {

        console.log("validateExternalAuth")

        this.externalLogin('api/user/login', auth)
            .subscribe({
                next: (res) => {

                    console.log(res);

                    localStorage.setItem("token", res.token);

                    this.router.navigate(['/']);
                },
                error: (err: HttpErrorResponse) => {

                    console.log(err);

                    this.socialAuthService.signOut();
                }
            });

    }
}