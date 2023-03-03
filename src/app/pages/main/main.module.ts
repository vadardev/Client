import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainTab } from './main.page';
import { MainTabRoutingModule } from './main.routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MainTabRoutingModule,
  ],
  declarations: [MainTab]
})
export class MainTabModule {}
