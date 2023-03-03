import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({ providedIn: 'root' })
export class UserService {

    public constructor(private jwtHelper: JwtHelperService) { }

    public isUserAuthenticated = (): boolean => {

        const token = localStorage.getItem("token");

        return !this.jwtHelper.isTokenExpired(token);
    };
}
