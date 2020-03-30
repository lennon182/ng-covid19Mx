import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { GetdataService } from 'src/app/services/getdata.service';

declare const $;
declare const google;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = {
    title: 'Covid19Mx Tracker | E. Iván Mtz. Leal',
    proyect: 'covid19mx',
    // tslint:disable-next-line: max-line-length
    description: 'Esta aplicación esta desarrollada para ser herramienta de apoyo para el seguimiento del coronavirus hoy presente en México.',
    Dev: 'E. Iván Mtz. Leal',
    bio: 'Former baseball player',
    image: 'https://lennon182.github.io/assets/images/coverCovid19.jpg'
  };

    @ViewChild('tooltip') tooltip: ElementRef;


  mexMap;
  sospechosos;
  infectados;
  muertes;
  muertesV2;
  covidApi: string;
  fecha;
  // modalData: { id: string, muertes: Array<any>, infectados: Array<any>, sospechosos: Array<any>, name: string};
  modalData: { id: string, muertes: number, infectados: Array<any>, sospechosos: Array<any>, name: string};
  swipeData: { id: string, muertes: Array<any>, infectados: Array<any>, sospechosos: Array<any>, name: string};
  mapData: { id: string, muertes: Array<any>, infectados: Array<any>, sospechosos: Array<any>, name: string};

  constructor(
      private title: Title, private meta: Meta,
      private renderer: Renderer2,
      private getdata: GetdataService) { }


  async ngOnInit() {
    window.scrollTo(0, 0);
    this.title.setTitle(this.data.title);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: 'https://covid19mx.ml/' },
      { name: 'og:title', content: this.data.title },
      { name: 'og:description', content: this.data.description },
      { name: 'og:image', content: this.data.image }
    ]);
    this.covidApi = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
    this.mexMap = [];
    this.fecha = new Date();
    this.fecha =
      new Intl.DateTimeFormat('es-MX', {month: 'long', day: 'numeric', year: 'numeric', timeZone: 'Australia/Sydney'}).format(this.fecha);
    this.sospechosos = [];
    this.infectados = [];
    this.muertes = [];
    this.muertesV2 = 0;
    this.modalData = { id: '', name: '', muertes: 0, infectados: [], sospechosos: []};
    this.swipeData = { id: '', name: '', muertes: [], infectados: [], sospechosos: []};
    this.mapData = { id: '', name: '', muertes: [], infectados: [], sospechosos: []};

    $(document).ready(() =>  {
       $('.modal').modal({
         dismissible: false
       });
       $('.tabs').tabs();
       $('select').formSelect();

     });

    this.getMuertes();
    this.getInfectados();
    this.getSospechosos();
    this.getMapa();

  }

  // ====== [GetMapa] ======
  async getMapa() {
    try {
      // GetaData
      this.mexMap = await this.getdata.getMapaMx();

      const m = [];
      const i = [];
      const s = [];

      this.mexMap.forEach(e => {
        // *************
        this.sospechosos.forEach( sospechosos => {
          if (e.name === sospechosos.estado) {
            s.push(sospechosos.estado);
            // console.log(s);
            if (s.length > 0 ) {
              e.fill = '#ffc400';
            }
          }
        });

        // *************
        this.infectados.forEach( infectados => {
          if (e.name === infectados.estado) {
            i.push(infectados.estado);
            // console.log(i);
            if (i.length > 0 ) {
              e.fill = '#e65100';
            }
          }
        });
        // *************
        // console.log(this.muertes);
        this.muertes.forEach(muertes => {
          // console.log(muertes);
          if (e.name === muertes.Estado) {
            // console.log(e.name);
            // console.log(muertes.Fallecidos);
            if (muertes.Fallecidos > 0) {
              // console.log('Hola...');
              m.push([muertes.Fallecidos , muertes.Estado]);
              // console.log('PUSHHHHHH=> ', m);
              e.fill = '#B71C1C';
            }
          }
        });
        // === [ V1 ] ===
         // this.muertes.forEach( muertes => {
        //   if (e.name === muertes.estado) {
        //     m.push(muertes.estado);
        //     console.log('MUERTES => ', m);
        //     this.flagMuertes = true;
        //     if (m.length > 0) {
        //       e.fill = '#B71C1C';
        //     }
        //   }
        // });

      });
    } catch (error) {
      console.log(error);
    }
  }
  // ====== [GetMuertes] ======
  async getMuertes() {
    try {
      this.muertes = await this.getdata.getMuertesLocal();
      this.getMapa();
      // console.log('MUERTES=>', this.muertes);
      // *****[ V2]***
      this.muertes.forEach( m => {
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
      this.getMapa();
      return this.infectados;
    } catch (error) {
      console.log(error);
    }
  }
  // ====== [GetSospechosos] ======
  async getSospechosos() {
    try {
      this.sospechosos = await this.getdata.getSospechososLocal();
      this.getMapa();
      return this.sospechosos;
    } catch (error) {
      console.log(error);
    }
  }

  // ===== [ MOUSE EVENTS] =====
  openModal(edoId: string, estado: string) {
    $('.modal').modal('open');
    const blur = document.getElementById('blurContainer');
    blur.setAttribute('class', 'blur');
    this.modalData.name = estado;
    this.modalData.id = edoId;
    console.log('Data is working...');

    // this.modalData.muertes = [];
    this.modalData.muertes = 0;
    this.modalData.infectados = [];
    this.modalData.sospechosos = [];

    this.muertes.forEach( (e) => {
      if (e.Estado === estado) {
        // console.log('MUERTES =>', e.Estado);
        this.modalData.muertes = e.Fallecidos;
      }
    });

    this.infectados.forEach( e => {
      if (e.estado === estado) {
        this.modalData.infectados.push(e);
      }
    });

    this.sospechosos.forEach( e => {
      if (e.estado === estado) {
        this.modalData.sospechosos.push(e);
      }
    });
  }

  selectState( estado ) {
    console.log('Selected => ', estado);
    this.swipeData.muertes = [];
    this.swipeData.infectados = [];
    this.swipeData.sospechosos = [];
  }

  modalDestroy() {
    this.modalData.muertes = 0;
    this.modalData.infectados = [];
    this.modalData.sospechosos = [];
    const blur = document.getElementById('blurContainer');
    blur.removeAttribute('class');
    $('.tabs').tabs('select', 'muertesTab');
    $('.modal').modal('close');
  }


}
