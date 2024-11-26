import { Component, OnInit, OnDestroy } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map | undefined;

  ngOnInit(): void {
    (mapboxgl as any).accessToken = 'TU_ACCESS_TOKEN'; // Reemplaza con tu token

    this.map = new mapboxgl.Map({
      container: 'map', // El contenedor del mapa en HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo predeterminado
      center: [-74.5, 40], // Coordenadas iniciales
      zoom: 9 // Nivel de zoom inicial
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
}
