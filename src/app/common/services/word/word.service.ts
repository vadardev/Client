import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UriUtility } from "../../utility/uri.utility";
import { WordItemModel } from "./models/wordItem.model";

@Injectable({ providedIn: 'root' })
export class WordService {
    constructor(private http: HttpClient, private uriUtility: UriUtility) { }

    getUnauthorizedWords(): Observable<WordItemModel[]> {
        return this.http.get(this.uriUtility.createCompleteRoute('api/word/unauthorizedWords', environment.urlAddress)).pipe(map((data: any) => {
            return data["words"].map(function (wordItem: any): WordItemModel {
                return new WordItemModel(wordItem.word, wordItem.definition);
            });
        }));
    }
}