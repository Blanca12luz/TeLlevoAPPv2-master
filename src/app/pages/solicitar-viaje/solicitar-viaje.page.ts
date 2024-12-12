import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-solicitar-viaje',
  templateUrl: './solicitar-viaje.page.html',
  styleUrls: ['./solicitar-viaje.page.scss'],
})
export class SolicitarViajePage implements OnInit {
  public viajes: any[] = []; // Lista de viajes obtenidos desde Firebase

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerViajes();
  }

  obtenerViajes() {
    this.firestore
      .collection('viajes') // Nombre de la colección en Firebase
      .valueChanges({ idField: 'id' }) // Recuperar datos con ID
      .subscribe(
        (data: any[]) => {
          this.viajes = data;
          console.log('Viajes obtenidos:', this.viajes);
        },
        (error) => {
          console.error('Error al obtener viajes:', error);
        }
      );
  }

  seleccionarViaje(viaje: any) {
    console.log('Viaje seleccionado:', viaje);

    // Guardar el viaje seleccionado en la colección "rutas"
    this.firestore
      .collection('rutas')
      .add(viaje)
      .then(() => {
        console.log('Viaje agregado a las rutas.');
        alert('Viaje agregado exitosamente.');
      })
      .catch((error) => {
        console.error('Error al agregar el viaje:', error);
      });
  }
}
