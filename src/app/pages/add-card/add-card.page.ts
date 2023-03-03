import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CardService } from 'src/app/common/services/card/card.service';
import { AddCardModel } from 'src/app/common/services/card/models/addCard.model';

@Component({
    selector: 'add-card',
    templateUrl: 'add-card.page.html'
})
export class AddCardPage {

    word: string = "";
    definition: string = "";
    example: string = "";
    otherExample = "";
    pictureUrl = "";

    constructor(private navController: NavController, private activateRoute: ActivatedRoute,
        private cardService: CardService) { }

    add() {
        this.cardService.addCard(new AddCardModel(this.word, this.definition, this.pictureUrl, this.example, this.otherExample))
            .subscribe({
                next: (res) => {

                    console.log(res);
                    this.navController.back();
                },
                error: (err: HttpErrorResponse) => {

                    console.log(err);

                    this.navController.back();
                }
            });
    }
}
