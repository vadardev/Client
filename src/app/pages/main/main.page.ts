import { Component, OnInit } from '@angular/core';
import { UserService } from "src/app/common/services/user/user.service";
import { CardService } from 'src/app/common/services/card/card.service';
import { DefaultCardWordItemModel } from 'src/app/common/services/card/models/defaultCardWordItem.model';
import { UserCardWordItemModel } from 'src/app/common/services/card/models/userCardWordItem.model';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'main-tab',
    templateUrl: 'main.page.html'
})
export class MainTab implements OnInit {

    defaultCards: DefaultCardWordItemModel[] = [];
    userCards: UserCardWordItemModel[] = [];
    isUserAuthenticated: boolean = false;

    constructor(private cardService: CardService, private userService: UserService,
        private navCtrl: NavController) { }



    ionViewWillEnter(): void {

        console.log('MainTab ionViewWillEnter');

        this.isUserAuthenticated = this.userService.isUserAuthenticated();

        if (this.isUserAuthenticated) {
            this.cardService.getUserCards().subscribe({ next: (data: UserCardWordItemModel[]) => this.userCards = data });
        }
        else {
            this.cardService.getDefaultCards().subscribe({ next: (data: DefaultCardWordItemModel[]) => this.defaultCards = data });
        }
    }


    ngOnInit() {
    }

    showUserCard(userCardId: string) {

        this.navCtrl.navigateRoot('/show-user-card/' + userCardId);
    }

    addCard()
    {
        this.navCtrl.navigateRoot('/add-card');
    }
}
