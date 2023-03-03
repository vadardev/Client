import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTab } from './main.page';


const routes: Routes = [
  {
    path: '',
    component: MainTab
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainTabRoutingModule { }
