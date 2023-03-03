import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UriUtility } from "../../utility/uri.utility";

@Injectable({ providedIn: 'root' })
export class TestService {
    constructor(private http: HttpClient, private uriUtility: UriUtility) { }

    test() {
        this.http.get(this.uriUtility.createCompleteRoute('api/test', environment.urlAddress)).subscribe({
            next: (res) => {

                console.log(res);
            }
        });


    }
}