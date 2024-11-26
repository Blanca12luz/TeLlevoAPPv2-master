import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ViajeService } from '../../services/viaje.service';
import * as mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { IonInputCustomEvent,InputInputEventDetail } from '@ionic/core';

@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.page.html',
  styleUrls: ['./crear-viajes.page.scss'],
})
export class CrearViajesPage implements OnInit, AfterViewInit {
onSearchInput($event: IonInputCustomEvent<InputInputEventDetail>) {
throw new Error('Method not implemented.');
}
  public nombre: string = '';
  public fecha: string = '';
  public espacioDisponible: number = 1;
  public precio: number | null = null;
  map!: mapboxgl.Map;

  // Cambiado a 'any' para evitar el error con el tipo
  geocoder: any; 

  constructor(private storage: Storage, private viajeService: ViajeService) {}

  

  ngAfterViewInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYmxhbmNhMTJsdXoiLCJhIjoiY20zeG8zejFrMWllYjJsb21nNXVib2dmcSJ9.SjGrl2JTogV9n6UxPxsBRA';
  
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Coordenadas de Nueva York (por defecto)
      zoom: 12,
    });
  
    this.map.addControl(new mapboxgl.NavigationControl());
  
    // Inicializa el Geocoder (buscador de destinos)
    this.geocoder = new MapboxGeocoder({
      accessToken: (mapboxgl as any).accessToken,
      mapboxgl: mapboxgl,
    });
  
    // Añadir el Geocoder al mapa
    this.map.addControl(this.geocoder);
  
    // Opcional: Manejar el evento de búsqueda (cuando se encuentra un destino)
    this.geocoder.on('result', (event: any) => {
      const coords = event.result.geometry.coordinates;
      console.log(`Lugar encontrado: ${event.result.place_name}`);
      console.log(`Coordenadas: Longitud: ${coords[0]}, Latitud: ${coords[1]}`);
  
      // Opcional: Centrar el mapa en el destino encontrado
      this.map.flyTo({
        center: coords,
        zoom: 14,
        speed: 1,
        curve: 1,
        easing: (t) => t,
      });
    });
  
    // Manejar el evento de clic en el mapa
    this.map.on('click', (event: mapboxgl.MapMouseEvent) => {
      const coordinates = event.lngLat;
      console.log(`Latitud: ${coordinates.lat}, Longitud: ${coordinates.lng}`);
    });
  }
  

  async ngOnInit() {
    await this.storage.create();
    this.fecha = new Date().toISOString();
  }

  async viajecreado(viajeForm: any) {
    if (viajeForm.invalid) {
      console.log('El formulario contiene errores.');
      return;
    }

    if (this.precio == null || isNaN(Number(this.precio))) {
      console.log('El precio debe ser un número válido');
      return;
    }

    await this.storage.set('nombre', this.nombre);
    await this.storage.set('fecha', this.fecha);
    await this.storage.set('espacioDisponible', this.espacioDisponible);
    await this.storage.set('precio', this.precio);

    console.log('Viaje creado y datos guardados');
  }
}
