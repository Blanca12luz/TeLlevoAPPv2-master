import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  public viajes: any[] = []; // Lista de viajes obtenidos desde Firebase

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.obtenerViajes(); // Llamamos al método para obtener los viajes al iniciar el componente
  }

  /**
   * Método para obtener los viajes desde Firebase
   */
  obtenerViajes() {
    this.firestore
      .collection('viajes') // Nombre de la colección en Firebase
      .valueChanges({ idField: 'id' }) // Recuperar datos con ID agregado como campo
      .subscribe(
        (data: any[]) => {
          this.viajes = data; // Asignamos los datos obtenidos a la lista de viajes
          console.log('Viajes obtenidos:', this.viajes); // Mostramos los datos obtenidos en consola
        },
        (error) => {
          console.error('Error al obtener viajes:', error); // Capturamos cualquier error al obtener los viajes
        }
      );
  }

  /**
   * Método para eliminar un viaje
/**
 * Método para eliminar un viaje con confirmación
/**
 * Método para eliminar un viaje con confirmación
 * @param viaje El objeto del viaje a eliminar
 */
borrarViaje(viaje: any) {

}
}
