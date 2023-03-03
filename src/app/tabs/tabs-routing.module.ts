import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../common/guards/auth.guard';
import { DictionaryTab } from '../pages/dictionary/dictionary.page';
import { ProfileTab } from '../pages/profile/profile.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: "main-tab",
        loadChildren: () => import('../pages/main/main.module').then(m => m.MainTabModule)
      },
      {
        path: "dictionary-tab",
        component: DictionaryTab
      },
      {
        path: "profile-tab",
        component: ProfileTab,
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/main-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
