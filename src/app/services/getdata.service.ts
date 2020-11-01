import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  sospechosos;
  infectados;
  muertes;
  datachart;
  mapamx;
  mapajson;
  uriGitApi;
  lastUpdate;

  version = 'v1.1.0';
  versionDescription: 'Cambio en el diseño, se agrego el chart e iconos mobile';
  linkNewAPI: 'https://github.com/carranco-sga/Mexico-COVID-19?files=1';
  linknewGlobalAPI: 'https://github.com/DataScienceResearchPeru/covid-19_latinoamerica/blob/master/README.md';
  apiSinave: 'http://ncov.sinave.gob.mx/Mapa45.aspx/Grafica23';

  constructor(private http: HttpClient, private db: AngularFirestore) {
    // ====== [INPROD] ======
    this.uriGitApi = 'https://lennon182.github.io/assets/data';
    this.sospechosos = `${this.uriGitApi}/sospechosos.json`;
    this.infectados = `${this.uriGitApi}/infectados.json`;
    this.muertes = `${this.uriGitApi}/muertes.json`;
    this.datachart = `${this.uriGitApi}/chart.json`;
    // ====== [INDEV] ======
    // this.sospechosos = `assets/data/sospechosos.json`;
    // this.datachart = 'assets/data/chart.json';
    // this.infectados = `assets/data/infectados.json`;
    // this.muertes = `assets/data/muertes.json`;

    // MAPA SVG
    this.mapamx = `assets/data/mapamx.json`;

    // this.mapajson = `assets/data/mapamxl.json`;
  }

  // ====== [ FIREBASE ] ======
  //  getSospechosos() {
  //    return new Promise((resolve, reject) => {
  //      try {
  //        this.db.collection('sospechosos').valueChanges().subscribe( data => {
  //          return resolve(data);
  //        });
  //      } catch (e) {
  //        return reject(console.log(e));
  //      }
  //    });
  //  }

  //  getInfectados() {
  //    return new Promise((resolve, reject) => {
  //      try {
  //        this.db.collection('infectados').valueChanges().subscribe( data => {
  //          return resolve(data);
  //        });
  //      } catch (e) {
  //        return reject(console.log(e));
  //      }
  //    });
  //  }

  //  getMuertes() {
  //    return new Promise((resolve, reject) => {
  //      try {
  //        this.db.collection('muertes').valueChanges().subscribe( data => {
  //          return resolve(data);
  //        });
  //      } catch (e) {
  //        return reject(console.log(e));
  //      }
  //    });
  //  }
  // ====== [HTTP - MAPA] ======
  getMapaMx() {
    return new Promise((resolve, reject) => {
      try {
        this.http.get<any>(this.mapamx).subscribe((datamapamx: Array<any>) => {
          return resolve(datamapamx);
        });
      } catch (e) {
        return reject(console.log(e));
      }
    });
  }

  getMapaJson() {
    return new Promise( (resolve, reject) => {
      try {
        this.http.get(this.mapajson).subscribe( d => {
          return resolve(d);
        });
      } catch (error) {
        return reject(console.log(error));
      }
    });
  }

  // ====== [HTTP - Sospechosos] ======
  getSospechososLocal() {
    return new Promise((resolve, reject) => {
      try {
        this.http.get<Array<any>>(this.sospechosos).subscribe(data => {
          return resolve(data);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  // ====== [HTTP - Infectados] ======
  getInfectadosLocal() {
    return new Promise((resolve, reject) => {
      try {
        this.http.get<any[]>(this.infectados).subscribe(data => {
          //  console.log('INFECTADOS', data);
          return resolve(data);
        });
      } catch (e) {
        return reject(e);
      }
    });
  }

  // ====== [HTTP - Muertes] ======
  getMuertesLocal() {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(this.muertes).subscribe((data: any) => {
          return resolve(data);
        });
      } catch (e) {
        return reject(console.log(e));
      }
    });
  }

  // ====== [HTTP - CHARTS] ======
  getDataChart() {
    return new Promise((resolve, reject) => {
      try {
        this.http.get(this.datachart).subscribe( (data: any) => {
          return resolve (data);
        });
      } catch (error) {
        return reject(console.log(error));
      }
    });
  }

  //  GetDATA GOB
  getDataGob() {
    return new Promise((resolve, reject) => {
      try {
        this.http
          .post(
            'http://ncov.sinave.gob.mx/Mapa45.aspx/Grafica23',
            {
              'Content-Type': 'application/json'
            },
            {}
          )
          .subscribe(r => {
            return resolve(r);
          });
      } catch (e) {
        return reject(console.log(e));
      }
    });
  }
}
