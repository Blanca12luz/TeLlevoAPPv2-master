import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  public viajes: any[] = []; // Lista de viajes obtenidos desde Firebase
  user :any;
  constructor(private firestore: AngularFirestore, private _auth:AuthServiceService) {}

  async ngOnInit() {
    this.user = await this._auth.getUser()
    await this.obtenerViajes(); // Llamamos al método para obtener los viajes al iniciar el componente
    
  }

  /**
   * Método para obtener los viajes desde Firebase
   */

  /**/
  async obtenerViajes() {
    
    this.firestore
      .collection('viajes') // Nombre de la colección en Firebase
      .valueChanges({ idField: 'id' }) // Recuperar datos con ID agregado como campo
      .subscribe(
        (data: any[]) => {
          this.viajes = data.filter ((doc:any)=>doc.usuario == this.user.uid); // Asignamos los datos obtenidos a la lista de viajes
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
