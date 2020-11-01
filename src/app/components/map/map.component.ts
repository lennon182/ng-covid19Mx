import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { mapa } from './../../model/mapmx';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {

    const estados = mapa; // Agregamos el ShapeFile para pintar el mapa
    this.map = L.map('map', { attributionControl: false }) // Inicializamos el mapa asignandolo al html por el ID map
    .setView([22.79906, -102.582447], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map); // Escogemos el proveedor que nos dara las imagenes, en este caso: OPENSTREETMAP

    // INTERACTION WITH MAP
    function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
           d.MUERTES === 0   ? 'red' :
                      '#FFEDA0';
    }
    function style(feature) {
      return {
        fillColor: getColor(feature.properties.DATA),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7,
      };
    }
    L.geoJson(estados, { style }).addTo(this.map); // GeoJson: Pintamos el ShapeFile en el mapa
}

}
