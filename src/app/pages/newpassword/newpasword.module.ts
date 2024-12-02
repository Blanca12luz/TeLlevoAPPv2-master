import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewpaswordPageRoutingModule } from './newpasword-routing.module';

import { NewpaswordPage } from './newpasword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewpaswordPageRoutingModule
  ],
  declarations: [NewpaswordPage]
})
export class NewpaswordPageModule {}
