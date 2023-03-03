import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/common/services/card/card.service';
import { DefaultCardModel } from 'src/app/common/services/card/models/defaulCard.model';

@Component({
    selector: 'show-default-card',
    templateUrl: 'show-default-card.page.html'
})
export class ShowDefaultCardPage implements OnInit {

    id: string;
    word: string = "";
    definition: string = "";
    pictureUrl: string = "";
    example: string = "";
    otherExample: string = "";
    withExample: boolean = false;

    constructor(private activateRoute: ActivatedRoute, private cardService: CardService) {
        this.id = activateRoute.snapshot.params['id'];
    }
    ngOnInit(): void {
        this.id = this.activateRoute.snapshot.params['id'];
        this.cardService.getDefaultCard(this.id).subscribe({
            next: (data: DefaultCardModel) => {
                this.word = data.word;
                this.definition = data.definition;
                this.pictureUrl = data.pictureUrl;
                this.example = data.example;
                this.otherExample = data.otherExample;
                this.withExample = this.example != null || this.otherExample != null;
            }
        });
    }
}
