import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment'; // Ruta según tu configuración


@Component({
  selector: 'app-crear-viajes',
  templateUrl: './crear-viajes.page.html',
  styleUrls: ['./crear-viajes.page.scss'],
})
export class CrearViajesPage implements OnInit, AfterViewInit {
  public nombre: string = ''; 
  public fecha: string = ''; 
  public espacioDisponible: number = 1; 
  public precio: number | null = null; 
  public searchQuery: string = ''; // Para el campo de búsqueda
  public map!: mapboxgl.Map; 
  public marker!: mapboxgl.Marker; 

  constructor() {}

  async ngOnInit() {
    this.fecha = new Date().toISOString();
  }

  ngAfterViewInit() {
        // Configurar el token de acceso para Mapbox



    // Inicializar el mapa
    (mapboxgl as any).default.accessToken = environment.mapboxAccessToken;
    this.map = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Coordenadas iniciales (Nueva York)
      zoom: 12, 
      accessToken: environment.mapboxAccessToken, // Token definido aquí
    });

    // Añadir un marcador en el centro inicial
    this.marker = new mapboxgl.Marker().setLngLat([-74.006, 40.7128]).addTo(this.map);
  }

  searchLocation() {
    if (!this.searchQuery.trim()) return;

    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(this.searchQuery)}.json?access_token=${(mapboxgl as any).default.accessToken}`;



    fetch(geocodingUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          // Actualizar el mapa y el marcador
          this.map.flyTo({ center: [lng, lat], zoom: 14 });
          this.marker.setLngLat([lng, lat]);
        }
      })
      .catch((error) => {
        console.error('Error al buscar ubicación:', error);
      });
  }

  async viajecreado(viajeForm: any) {
    if (viajeForm.invalid) {
      console.log('El formulario contiene errores.');
      return;
    }
    console.log('Viaje creado:', {
      nombre: this.nombre,
      fecha: this.fecha,
      espacioDisponible: this.espacioDisponible,
      precio: this.precio,
    });
  }
}
