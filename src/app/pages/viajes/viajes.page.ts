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
  BorrarViaje(viajes: any) {
    if (confirm(`¿Estás seguro de cancelar el viaje a ${viajes.id}`)) {
      this.firestore
        .collection('viajes')
        .doc(viajes.id)
        .delete()
        .then(() => {
          console.log('Viaje eliminado.');
          alert('Viaje eliminado exitosamente.');
        })
        .catch((error) => {
          console.error('Error al eliminar el viaje:', error);
        });
    }
  }

}
