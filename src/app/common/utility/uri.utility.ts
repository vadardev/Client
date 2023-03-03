import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UriUtility {
    createCompleteRoute = (route: string, envAddress: string) => {
        return `${envAddress}/${route}`;
    }
}