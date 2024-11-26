import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;

  ngOnInit() {
    // Configura Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYmxhbmNhMTJsdXoiLCJhIjoiY20zeXQ4MGx4MDdkeTJpcHNlM3R1NHUweSJ9.nzdOzpvsEgyphRdTeP6Apw';
  }

  ngAfterViewInit() {
    // Inicializa el mapa
    const map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-74.5, 40], // Coordenadas iniciales [lng, lat]
      zoom: 9, // Nivel de zoom
    });
  }
}