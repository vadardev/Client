import { Component } from "@angular/core";
import { AuthService } from "src/app/common/services/auth/auth.service";

@Component({
    selector: 'auth',
    templateUrl: 'auth.page.html',
    styleUrls: ['auth.page.css']
})
export class AuthPage {

    constructor(private authService: AuthService) { }
}