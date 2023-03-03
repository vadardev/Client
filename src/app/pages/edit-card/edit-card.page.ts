import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CardService } from 'src/app/common/services/card/card.service';
import { EditCardModel } from 'src/app/common/services/card/models/editCard.model';
import { UserCardModel } from 'src/app/common/services/card/models/userCard.model';

@Component({
    selector: 'edit-card',
    templateUrl: 'edit-card.page.html',
    styleUrls: ['edit-card.page.css']
})
export class EditCardPage implements OnInit {

    id: string = "";
    word: string = "";
    definition: string = "";
    example: string = "";
    otherExample = "";
    pictureUrl = "";

    constructor(private navController: NavController, private activateRoute: ActivatedRoute,
        private cardService: CardService) {
        this.id = activateRoute.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.cardService.getUserCard(this.id).subscribe({
            next: (data: UserCardModel) => {
                this.id = data.userCardId;
                this.word = data.word;
                this.definition = data.definition;
                this.pictureUrl = data.pictureUrl;
                this.example = data.example;
                this.otherExample = data.otherExample;
            }
        });
    }


    save() {
        this.cardService.editCard(this.id, new EditCardModel(this.word, this.definition, this.pictureUrl, this.example, this.otherExample))
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
