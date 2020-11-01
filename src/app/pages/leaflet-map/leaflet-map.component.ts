import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Title, Meta } from '@angular/platform-browser';
import { mapa } from '../../model/mapmx';
import { GetdataService } from 'src/app/services/getdata.service';

declare var $;
@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements OnInit {
  map;
  sospechosos;
  infectados: any;
  muertes;
  muertesV2;
  chart;
  lastUpdate;
  lastDate;
  covidApi: string;
  fecha;
  mapaData;
  mapaDataFeatures: Array<any>;
  mapaJson;
  blur: HTMLElement;
  constructor(
    private getdata: GetdataService,
    private title: Title,
    private meta: Meta
  ) {}

  async ngOnInit() {
    this.mapaDataFeatures = [];
    this.sospechosos = [];
    this.infectados = [];
    this.muertes = [];
    this.muertesV2 = 0;
    this.chart = [];
    this.lastUpdate = [];
    this.fecha = new Date();
    $(document).ready(() => {
      $('.modal').modal({
        dismissible: false
      });
      $('.tabs').tabs();
      $('select').formSelect();
    });

    await this.getChart();
    await this.getMuertes();
    await this.getInfectados();
    await this.getSospechosos();

    // CARGAR DATA PARA PINTAR EL MAPA
    this.mapaData = mapa;
    this.mapaDataFeatures = this.mapaData.features;

    this.mapaDataFeatures.forEach( e => {
      this.infectados.forEach( i => {if (i.estado === e.properties.ESTADO) { e.properties.DATA.INFECTADOS ++; } });
      this.sospechosos.forEach( s => {if (s.estado === e.properties.ESTADO) { e.properties.DATA.SOSPECHOSOS ++; } });
      this.muertes.forEach( m => {if (m.Estado === e.properties.ESTADO) { e.properties.DATA.MUERTES = m.Fallecidos; } });
    });
    // =========>
    await this.initMap(this.muertes, this.sospechosos, this.infectados);
  }

  async initMap(muert: Array<any>, sospe: Array<any>, infect: Array<any>) {

    this.map = L.map('map', { attributionControl: false }).setView(
      [22.799060, -102.582447],
      5
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        'covid19mx... <a href="https://covid19mx.ml" target="_blank">Covid19MX</a>',
      maxZoom: 18
    }).addTo(this.map);

    // L.control.scale().addTo(this.map);

    const getColor = e => {
      // e = CDMX
      // return e.MUERTES > 0 ? '#B71C1C' :
      //           e.INFECTADOS > 0 ? '#e65100' : '#ffc400';
      return (e.MUERTES > 0 && e.MUERTES <= 50) ? '#2196f3' :
                (e.MUERTES > 50 && e.MUERTES <= 100) ? '#0d47a1' :
                (e.MUERTES > 100 && e.MUERTES <= 150) ? '#fb8c00' :
                (e.MUERTES > 150 && e.MUERTES <= 200) ? '#e65100' :
                (e.MUERTES > 200 && e.MUERTES <= 500) ? '#ff1744' :
                (e.MUERTES > 500 && e.MUERTES <= 1000) ? '#d50000' :
                (e.MUERTES > 1000 && e.MUERTES <= 2000) ? '#000000' : '#00c853';
    };

    const style = (feature) => {
      return {
        fillColor: getColor(feature.properties.DATA),
        weight: 2,
        opacity: 0.3,
        color: 'black',
        dashArray: '1',
        fillOpacity: 1
      };
    };

    const info = L.control();

    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    info.update = function(feature) {
      this._div.innerHTML = `
      <div class="center-align" style="font-size: 1.5rem; padding: 0.5rem;">covid19mx</div>` + (feature ? `
      <div class="center-align" style="padding: 0.5rem;">
      <b>${feature.ESTADO}</b>
      </div>
      <div class="center-align">
      Click en el estado para más información
      </div>
      ` : '<div class="center-align">Click en el estado para más información</div>');
    };

    // method that we will use to update the control based on feature properties passed
    info.addTo(this.map);

    function highlightFeature(e) {
      const layer = e.target;
      layer.setStyle({
        fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }

    // let geojson;

    function resetHighlight(e) {
      // geojson.resetStyle(e.target);
      const layer = e.target;
      layer.setStyle({
        fillOpacity: 1
      });
      info.update();
    }

    // function zoomToFeature(e) {
    //   this.map.fitBounds(e.target.getBounds());
    // }

    // FUNCTION MASTER
    const popup = (feature, layer) => {

      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });

    // **********
      if (feature.properties && feature.properties.ESTADO) {
        layer.bindPopup(`
                  <div class="row no-marpad center-align " style="color: white ">
                    <div class="col s12 z-depth-2" style="padding: 1rem">
                        <img src="assets/images/covid2.svg " srcset="assets/images/covid2.svg " class="responsive-img " style="max-width: 54px;">
                        <br>
                        <span style="font-size: 1.5rem">${feature.properties.ESTADO}</span>
                        <br>
                    </div>
                    <div class="col s12 red darken-4 z-depth-3 "style="padding: 0.5rem; font-size: 1.2rem">
                        <span>Muertes: ${feature.properties.DATA.MUERTES}</span>
                    </div>
                    <br>
                    <div class="col s12 orange darken-4 z-depth-3 "style="padding: 0.5rem; font-size: 1.2rem">
                        <span>Infectados: ${feature.properties.DATA.INFECTADOS}</span>
                    </div>
                    <br>
                    <div class="col s12 amber accent-3 z-depth-3 "style="padding: 0.5rem; font-size: 1.2rem">
                        <span>Sospechosos: ${feature.properties.DATA.SOSPECHOSOS} </span>
                    </div>
                    <div class="divider"></div>
                    <div class="col s12 accent-3 z-depth-3 "style="margin-top:1rem; padding: 0.5rem; font-size: 1.2rem">
                        <span>☎️ Directorio: <br> ${feature.properties.CONTACTO} </span>
                    </div>
                </div>
                `);
      }
    };
    L.geoJson(this.mapaData, { style, onEachFeature: popup }).addTo(this.map);
    //
    const legend = L.control({position: 'bottomright'});

    legend.onAdd = (map) => {
      const div = L.DomUtil.create('div', 'info legend');
      const labels = ['<div class="info-legend-title">Muertes</div>'];
      const grades = ['MUERTES', 'INFECTADOS', 'SOSPECHOSOS'];
      const deathsGrades =
        [
          {grade: '0'}, {grade: '1-50'}, {grade: '51-100'},
          {grade: '101-150'}, {grade: '151-200'}, {grade: '201-500'},
          {grade: '501-1000'}, {grade: '1001-2000'}
        ];
      // const labels = [];
      // let from;
      // let to;

      // grades.forEach( e => {
      //   e === 'MUERTES' ? labels.push(`<span style="color: #f0f0f0; padding: 0.5rem; background-color: #B71C1C">${e}...</span><br>`) :
      //   e === 'INFECTADOS' ? labels.push(`<span style="color: #f0f0f0; padding: 0.5rem; background-color: #e65100">${e}</span><br>`) :
      //   e === 'SOSPECHOSOS' ? labels.push(`<span style="color: #f0f0f0; padding: 0.5rem; background-color: #ffc400">${e}</span>`) :
      //   labels.push('No');
      // });
      deathsGrades.forEach( e => {
        e.grade === '0' ?
        labels.push(`<div class="info-legend" style="background-color: #00c853">${e.grade}</div>`) :
        e.grade === '1-50' ?
        labels.push(`<div class="info-legend" style="background-color: #2196f3">${e.grade}</div>`) :
        e.grade === '51-100' ?
        labels.push(`<div class="info-legend" style="background-color: #0d47a1">${e.grade}</div>`) :
        e.grade === '101-150' ?
        labels.push(`<div class="info-legend" style="background-color: #fb8c00">${e.grade}</div>`) :
        e.grade === '151-200' ?
        labels.push(`<div class="info-legend" style="background-color: #e65100">${e.grade}</div>`) :
        e.grade === '201-500' ?
        labels.push(`<div class="info-legend" style="background-color: #ff1744">${e.grade}</div>`) :
        e.grade === '501-1000' ?
        labels.push(`<div class="info-legend" style="background-color: #d50000">${e.grade}</div>`) :
        e.grade === '1001-2000' ?
        labels.push(`<div class="info-legend" style="background-color: #000000">${e.grade}</div>`) :
        labels.push('');
      });
      div.innerHTML = labels.join('');
      return div;
    };
    legend.addTo(this.map);
  }

  // ====== [GetCHART] ======
  async getChart() {
    try {
      this.chart = await this.getdata.getDataChart();
      const date1 = this.chart[this.chart.length - 1];
      const date = date1.Fecha;
      this.lastDate =
      // tslint:disable-next-line:max-line-length
      new Intl.DateTimeFormat('es-MX', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Australia/Sydney'}).format(new Date(date));
      console.log(this.lastDate);
      return this.lastDate;
    } catch (error) {
      console.log(error);
    }
  }
  // ====== [GetMuertes] ======
  async getMuertes() {
    try {
      this.muertes = await this.getdata.getMuertesLocal();
      // console.log('MUERTES=>', this.muertes);
      // *****[ V2]***
      this.muertes.forEach(m => {
        this.muertesV2 = this.muertesV2 + m.Fallecidos;
        // console.log(this.muertesV2);
      });
      // *****[ V2]***
      // return this.muertes;
      return this.muertesV2;
    } catch (error) {
      console.log(error);
    }
  }
  // ====== [GetInfectados] ======
  async getInfectados() {
    try {
      this.infectados = await this.getdata.getInfectadosLocal();
      return this.infectados;
    } catch (error) {
      console.log(error);
    }
  }
  // ====== [GetSospechosos] ======
  async getSospechosos() {
    try {
      this.sospechosos = await this.getdata.getSospechososLocal();
      return this.sospechosos;
    } catch (error) {
      console.log(error);
    }
  }
}
