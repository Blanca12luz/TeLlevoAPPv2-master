import { Component, OnInit } from '@angular/core';
import { AngularFirestore,  } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
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

  async borrarviaje(viaje: any){
    await deleteDoc(this.viajes,viaje);
    console.log("Viaje eliminado");
  }
}
function deleteDoc(viajes: any[], viaje: any) {
  throw new Error('Function not implemented.');
}

