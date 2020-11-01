import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

import { GetdataService } from 'src/app/services/getdata.service';

declare const $;
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
export class HomeComponent implements OnInit {

    @ViewChild('tooltip') tooltip: ElementRef;


  mexico;

  mexMap;
  sospechosos: Array<any>;
  infectados: Array<any>;
  muertes: Array<any>;
  arrayTemp: Array<any>;
  covidApi: string;
  fecha;
  modalData: { id: string, muertes: Array<any>, infectados: Array<any>, sospechosos: Array<any>, name: string};

  // Estados ARRAY

mexBCN: Array<any>;
mexBCS: Array<any>;
mexCOAH: Array<any>;
mexCHIH: Array<any>;
mexDUR: Array<any>;
mexSIN: Array<any>;
mexSON: Array<any>;
mexZAC: Array<any>;
mexNL: Array<any>;
mexSLP: Array<any>;
mexTAM: Array<any>;
mexAGC: Array<any>;
mexCOL: Array<any>;
mexJAL: Array<any>;
mexMICH: Array<any>;
mexNAY: Array<any>;
mexCAMP: Array<any>;
mexOAX: Array<any>;
mexPUE: Array<any>;
mexTAB: Array<any>;
mexTLAX: Array<any>;
mexCDMX: Array<any>;
mexGUAN: Array<any>;
mexGUER: Array<any>;
mexHGO: Array<any>;
mexMEX: Array<any>;
mexMOR: Array<any>;
mexQRT: Array<any>;
mexVER: Array<any>;
mexCHIS: Array<any>;
mexQNR: Array<any>;
mexYUC: Array<any>;

//
    constructor(
      private renderer: Renderer2,
      private getdata: GetdataService) { }


  ngOnInit(): void {
    this.covidApi = 'https://coronavirus-tracker-api.herokuapp.com/v2/locations';
    this.mexMap = [];
    this.fecha = new Date();
    this.mexMap = this.mexico;
    this.sospechosos = [];
    this.infectados = [];
    this.muertes = [];
    this.arrayTemp = [];
    this.modalData = { id: '', name: '', muertes: [], infectados: [], sospechosos: []};

    // ESTADOS
    this.mexBCN = [];
    this.mexBCS = [];
    this.mexCOAH = [];
    this.mexCHIH = [];
    this.mexDUR = [];
    this.mexSIN = [];
    this.mexSON = [];
    this.mexZAC = [];
    this.mexNL = [];
    this.mexSLP = [];
    this.mexTAM = [];
    this.mexAGC = [];
    this.mexCOL = [];
    this.mexJAL = [];
    this.mexMICH = [];
    this.mexNAY = [];
    this.mexCAMP = [];
    this.mexOAX = [];
    this.mexPUE = [];
    this.mexTAB = [];
    this.mexTLAX = [];
    this.mexCDMX = [];
    this.mexGUAN = [];
    this.mexGUER = [];
    this.mexHGO = [];
    this.mexMEX = [];
    this.mexMOR = [];
    this.mexQRT = [];
    this.mexVER = [];
    this.mexCHIS = [];
    this.mexQNR = [];
    this.mexYUC = [];

    // MODAL init
    $(document).ready( () => {
      $('.modal').modal();
      $('.tabs').tabs();
    });


    // ====== [MAPA] ======
    this.getdata.getMapaMx().then( (mapa: Array<any>) => {
      this.mexMap = mapa;
    }).catch( e => console.log('Error get mapa', e));

    // ====== [INFECTADOS] ======
    this.getdata.getInfectadosLocal().then( (data: Array<any>) => {
      data.forEach( e => {
        if ((e.estado === 'BAJA CALIFORNIA')) { e.estadoID = 'MEX-BCN';
      } else if ((e.estado === 'BAJA CALIFORNIA SUR')) { e.estadoID = 'MEX-BCS';
        } else if ((e.estado === 'COAHUILA')) { e.estadoID = 'MEX-COAH';
        } else if ((e.estado === 'CHIHUAHUA')) { e.estadoID = 'MEX-CHIH';
        } else if ((e.estado === 'DURANGO')) { e.estadoID = 'MEX-DUR';
        } else if ((e.estado === 'SINALOA')) { e.estadoID = 'MEX-SIN';
        } else if ((e.estado === 'SONORA')) { e.estadoID = 'MEX-SON';
        } else if ((e.estado === 'ZACATECAS')) { e.estadoID = 'MEX-ZAC';
        } else if ((e.estado === 'NUEVO LEÓN')) { e.estadoID = 'MEX-NL';
        } else if ((e.estado === 'SAN LUIS POTOSÍ')) { e.estadoID = 'MEX-SLP';
        } else if ((e.estado === 'TAMAULIPAS')) { e.estadoID = 'MEX-TAM';
        } else if ((e.estado === 'AGUAS CALIENTES')) { e.estadoID = 'MEX-AGC';
        } else if ((e.estado === 'COLIMA')) { e.estadoID = 'MEX-COL';
        } else if ((e.estado === 'JALISCO')) { e.estadoID = 'MEX-JAL';
        } else if ((e.estado === 'MICHOACÁN')) { e.estadoID = 'MEX-MICH';
        } else if ((e.estado === 'NAYARIT')) { e.estadoID = 'MEX-NAY';
        } else if ((e.estado === 'CAMPECHE')) { e.estadoID = 'MEX-CAMP';
        } else if ((e.estado === 'OAXACA')) { e.estadoID = 'MEX-OAX';
        } else if ((e.estado === 'PUEBLA')) { e.estadoID = 'MEX-PUE';
        } else if ((e.estado === 'TABASCO')) { e.estadoID = 'MEX-TAB';
        } else if ((e.estado === 'TLAXCALA')) { e.estadoID = 'MEX-TLAX';
        } else if ((e.estado === 'CIUDAD DE MÉXICO')) { e.estadoID = 'MEX-CDMX';
        } else if ((e.estado === 'GUANAJUATO')) { e.estadoID = 'MEX-GUA';
        } else if ((e.estado === 'GUERRERO')) { e.estadoID = 'MEX-GUER';
        } else if ((e.estado === 'HIDALGO')) { e.estadoID = 'MEX-HGO';
        } else if ((e.estado === 'MÉXICO')) { e.estadoID = 'MEX-MEX';
        } else if ((e.estado === 'MORELIA')) { e.estadoID = 'MEX-MOR';
        } else if ((e.estado === 'QUERETARO')) { e.estadoID = 'MEX-QRT';
        } else if ((e.estado === 'VERACRUZ')) { e.estadoID = 'MEX-VER';
        } else if ((e.estado === 'CHIAPAS')) { e.estadoID = 'MEX-CHIS';
        } else if ((e.estado === 'QUINTANA ROO')) { e.estadoID = 'MEX-QNO';
        } else if ((e.estado === 'YUCATÁN')) { e.estadoID = 'MEX-YUC';
        }
      });
      this.infectados = data;
    }).catch( e => console.log('Error get Infectados', e));

    // ====== [SOSPECHOSOS] ======
    this.getdata.getSospechososLocal().then( (data: Array<any>) => {
      this.sospechosos = data;
    }).catch( e => console.log( 'Error get Sospechosos', e));

    // ====== [MUERTES] ======
    this.getdata.getMuertesLocal().then( (data: Array<any>) => {
      this.muertes = data;
    }).catch( e => console.log( 'Error get MUERTEs', e));
  }

  // ===== [ MOUSE EVENTS] =====
  openModal(edoId: string, estado: string) {
    this.modalData.name = estado;
    this.modalData.id = edoId;
    console.log('Hola mundo');

    this.modalData.muertes = [];
    this.modalData.infectados = [];
    this.modalData.sospechosos = [];

    this.muertes.forEach( (e) => {
      if (e.estado === estado) {
        this.modalData.muertes.push(e);
      }
    });

  }

  mouseEnter($event, data) {
    this.renderer.setStyle(this.tooltip.nativeElement, 'display', 'block');
    this.renderer.setProperty(this.tooltip.nativeElement, 'innerHTML', data);

  }

  mouseLeave($event) {
  // this.renderer.setProperty(this.tooltip.nativeElement, 'innerHTML', '');
  this.renderer.setStyle(this.tooltip.nativeElement, 'display', 'none');
  }

  // ===== [ DATA ForEACH] =====
  dataForeach(data: Array<any>) {

  }

}
