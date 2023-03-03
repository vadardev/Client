import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UriUtility } from "../../utility/uri.utility";
import { AddCardModel } from "./models/addCard.model";
import { DefaultCardModel } from "./models/defaulCard.model";
import { DefaultCardWordItemModel } from "./models/defaultCardWordItem.model";
import { EditCardModel } from "./models/editCard.model";
import { UserCardModel } from "./models/userCard.model";
import { UserCardWordItemModel } from "./models/userCardWordItem.model";

@Injectable({ providedIn: 'root' })
export class CardService {
    constructor(private http: HttpClient, private uriUtility: UriUtility) { }

    getDefaultCards(): Observable<DefaultCardWordItemModel[]> {
        return this.http.get(this.uriUtility.createCompleteRoute('api/card/default', environment.urlAddress)).pipe(map((data: any) => {
            return data["cards"].map(function (cardItem: any): DefaultCardWordItemModel {
                return new DefaultCardWordItemModel(cardItem.cardId, cardItem.word, cardItem.definition);
            });
        }));
    }

    getDefaultCard(id: string): Observable<DefaultCardModel> {
        return this.http.get(this.uriUtility.createCompleteRoute('api/card/default/' + id, environment.urlAddress)).pipe(map((data: any) => {

            return new DefaultCardModel(data.word, data.definition, data.pictureUrl, data.example, data.otherExample);
        }));
    }

    getUserCards(): Observable<UserCardWordItemModel[]> {
        return this.http.get(this.uriUtility.createCompleteRoute('api/card/all', environment.urlAddress)).pipe(map((data: any) => {
            return data["cards"].map(function (cardItem: any): UserCardWordItemModel {
                return new UserCardWordItemModel(cardItem.userCardId, cardItem.cardId, cardItem.word, cardItem.definition);
            });
        }));
    }

    getUserCard(id: string): Observable<UserCardModel> {
        return this.http.get(this.uriUtility.createCompleteRoute('api/card/user/' + id, environment.urlAddress)).pipe(map((data: any) => {

            return new UserCardModel(data.userCardId, data.word, data.definition, data.pictureUrl, data.example, data.otherExample);
        }));
    }

    editCard(id: string, body: EditCardModel) {
        return this.http.post<EditCardModel>(this.uriUtility.createCompleteRoute('api/card/user/' + id + '/edit', environment.urlAddress), body);
    }

    addCard(body: AddCardModel) {
        return this.http.post<AddCardModel>(this.uriUtility.createCompleteRoute('api/card/add', environment.urlAddress), body);
    }

    deleteCard(id: string) {
        return this.http.delete(this.uriUtility.createCompleteRoute('api/card/'+id+'/delete', environment.urlAddress));
    }
}