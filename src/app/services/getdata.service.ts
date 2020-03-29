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
  mapamx;
  uriGitApi;

  version = 'v1.0.8';
  versionDescription: 'Usamos nueva API - 03-24-2020';
  linkNewAPI: 'https://github.com/carranco-sga/Mexico-COVID-19?files=1';
  linknewGlobalAPI: 'https://github.com/DataScienceResearchPeru/covid-19_latinoamerica/blob/master/README.md';

  constructor(
    private http: HttpClient,
    private db: AngularFirestore,
    ) {

      // ====== [INPROD] ======
    this.uriGitApi = 'https://lennon182.github.io/assets/data';
    this.sospechosos = `${this.uriGitApi}/sospechosos.json`;
    this.infectados = `${this.uriGitApi}/infectados.json`;
    this.muertes = `${this.uriGitApi}/muertes.json`;
    // ====== [INDEV] ======
    // this.sospechosos = `assets/data/sospechosos.json`;
    // this.infectados = `assets/data/infectados.json`;
    // this.muertes = `assets/data/muertes.json`;

    // MAPA
    this.mapamx = `assets/data/mapamx.json`;
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
        this.http.get<any>(this.mapamx).subscribe( (datamapamx: Array<any>) => {
          return resolve(datamapamx);
        });
      } catch (e) {
        return reject(console.log(e));
      }
    });
  }

  // ====== [HTTP - Sospechosos] ======
   getSospechososLocal() {
     return new Promise( (resolve, reject) => {
       try {
         this.http.get<Array<any>>(this.sospechosos).subscribe( data => {
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
         this.http.get<Array<any>>(this.infectados).subscribe( data => {
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
         this.http.get(this.muertes).subscribe( data => {
           return resolve(data);
         });
       } catch (e) {
         return reject( console.log(e));
       }
     } );
   }

  //  GetDATA GOB
  getDataGob() {
    return new Promise((resolve, reject) => {
      try {
        this.http.post('http://ncov.sinave.gob.mx/Mapa45.aspx/Grafica23', {
          'Content-Type': 'application/json'
        }, {}).subscribe( r => {
                  return resolve(r);
                });
      } catch (e) {
        return reject( console.log(e));
      }
    });
  }
}
