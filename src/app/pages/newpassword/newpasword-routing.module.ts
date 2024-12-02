import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewpaswordPage } from './newpasword.page';

const routes: Routes = [
  {
    path: '',
    component: NewpaswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewpaswordPageRoutingModule {}
