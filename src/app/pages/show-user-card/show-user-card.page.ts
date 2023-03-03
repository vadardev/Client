import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CardService } from 'src/app/common/services/card/card.service';
import { UserCardModel } from 'src/app/common/services/card/models/userCard.model';

@Component({
    selector: 'show-user-card',
    templateUrl: 'show-user-card.page.html',
    styleUrls: ['show-user-card.page.css']
})
export class ShowUserCardPage implements OnInit {

    id: string = "";
    word: string = "";
    definition: string = "";
    pictureUrl: string = "";
    example: string = "";
    otherExample: string = "";
    withExample: boolean = false;

    constructor(private router: Router, private activateRoute: ActivatedRoute,
        private cardService: CardService, private navController: NavController) { }

    ionViewWillEnter() {
        this.id = this.activateRoute.snapshot.params['id'];
        this.cardService.getUserCard(this.id).subscribe({
            next: (data: UserCardModel) => {
                this.id = data.userCardId;
                this.word = data.word;
                this.definition = data.definition;
                this.pictureUrl = data.pictureUrl;
                this.example = data.example;
                this.otherExample = data.otherExample;
                this.withExample = this.example != null || this.otherExample != null;
            }
        });
    }

    ngOnInit(): void { }

    delete(id: string) {
        this.cardService.deleteCard(id)
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
