import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';
import { AuthGuard } from './common/guards/auth.guard';
import { AddCardPage } from './pages/add-card/add-card.page';
import { ShowDefaultCardPage } from './pages/show-default-card/show-default-card.page';
import { ShowUserCardPage } from './pages/show-user-card/show-user-card.page';
import { EditCardPage } from './pages/edit-card/edit-card.page';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-card',
    component: AddCardPage,
    canActivate: [AuthGuard],
  },
  {
    path: 'show-default-card/:id',
    component: ShowDefaultCardPage
  },
  {
    path: 'show-user-card/:id',
    component: ShowUserCardPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'show-user-card/:id/edit-card',
    component: EditCardPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
