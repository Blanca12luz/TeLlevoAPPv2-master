import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  public viajes: any[] = [];
  private db = getFirestore(initializeApp(environment.firebase)); // Inicializar Firestore

  constructor() {}

  ngOnInit() {
    this.obtenerViajes();
  }

  /**
   * Método para obtener los viajes desde Firebase
   */
  async obtenerViajes() {
    try {
      const viajesRef = collection(this.db, 'viajes');
      const snapshot = await getDocs(viajesRef);
      this.viajes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Viajes obtenidos:', this.viajes);
    } catch (error) {
      console.error('Error al obtener viajes:', error);
    }
  }

  /**
   * Método para eliminar un viaje usando deleteDoc
   * @param viaje El viaje a eliminar
   */
  async borrarViaje(viaje: any) {
    if (viaje.id) {
      try {
        await deleteDoc(doc(this.db, 'viajes', viaje.id)); // Eliminar el documento
        console.log(`Viaje con ID ${viaje.id} eliminado.`);
        // Actualizar la lista local de viajes
        this.viajes = this.viajes.filter(v => v.id !== viaje.id);
      } catch (error) {
        console.error('Error al eliminar el viaje:', error);
      }
    } else {
      console.error('El viaje no tiene un ID válido.');
    }
  }
}
