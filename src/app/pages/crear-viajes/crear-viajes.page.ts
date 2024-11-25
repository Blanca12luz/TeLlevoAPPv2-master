import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ViajeService } from '../../services/viaje.service';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.page.html',
  styleUrls: ['./crear-viajes.page.scss'],
})
export class CrearViajesPage implements OnInit {
  public nombre: string = ''; // Nombre del viaje
  public fecha: string = ''; // Fecha seleccionada
  public espacioDisponible: number = 1; // Espacios disponibles
  public precio: number | null = null; // Precio del viaje

  constructor(private storage: Storage, private viajeService: ViajeService) {}

  async ngOnInit() {
    // Crear el almacenamiento si aún no existe
    await this.storage.create();

    // Establecer una fecha predeterminada (fecha actual)
    this.fecha = new Date().toISOString();
  }

  /**
   * Método para manejar la creación de un viaje
   * @param viajeForm - Formulario que contiene los datos
   */
  async viajecreado(viajeForm: any) {
    // Validar que el formulario sea válido
    if (viajeForm.invalid) {
      console.log('El formulario contiene errores. Por favor, revisa los campos obligatorios.');
      return;
    }

    // Validar que el precio sea un número válido
    if (this.precio == null || isNaN(Number(this.precio))) {
      console.log('El precio debe ser un número válido');
      return;
    }

    // Guardar los datos en el almacenamiento
    await this.storage.set('nombre', this.nombre);
    await this.storage.set('fecha', this.fecha);
    await this.storage.set('espacioDisponible', this.espacioDisponible);
    await this.storage.set('precio', this.precio);

    console.log('Viaje creado y datos guardados');
    console.log('Datos del viaje:', {
      nombre: this.nombre,
      fecha: this.fecha,
      espacioDisponible: this.espacioDisponible,
      precio: this.precio,
    });
  }

  // link para ir a la pagina lugar
}
