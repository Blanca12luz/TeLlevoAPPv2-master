import { CrearViajesPage } from './../crear-viajes/crear-viajes.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from 'src/app/components/map-component/map-component.component';

@NgModule({
  declarations: [
    CrearViajesPage, // Declara tu página
    MapComponent, // Declara MapComponent aquí
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class CrearViajesPageModule {}