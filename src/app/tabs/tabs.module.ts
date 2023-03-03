import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { DictionaryTab } from '../pages/dictionary/dictionary.page';
import { ProfileTab } from '../pages/profile/profile.page';
import { AddCardPage } from '../pages/add-card/add-card.page';
import { ShowDefaultCardPage } from '../pages/show-default-card/show-default-card.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, DictionaryTab, ProfileTab, ShowDefaultCardPage]
})
export class TabsPageModule {}
