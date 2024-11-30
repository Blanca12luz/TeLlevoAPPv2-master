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

  /**
   * Método para obtener los viajes desde Firebase
   */
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
}
