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
    if (viaje.espaciosDisponibles > 0) {
      const nuevoEspacio = viaje.espaciosDisponibles - 1;

      // Actualizar el espacio disponible del viaje seleccionado
      this.firestore
        .collection('viajes')
        .doc(viaje.id)
        .update({ espaciosDisponibles: nuevoEspacio })
        .then(() => {
          console.log('Espacios disponibles actualizados.');

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
        })
        .catch((error) => {
          console.error('Error al actualizar los espacios disponibles:', error);
        });
    } else {
      alert('No hay espacios disponibles para este viaje.');
    }
  }
}
