import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
firebase.initializeApp(environment.firebaseConfig);

import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalMapComponent } from './pages/global-map/global-map.component';
import { ChartsModule } from 'ng2-charts';
import { FuentesOficialesComponent } from './components/fuentes-oficiales/fuentes-oficiales.component';
import { ModalComponent } from './components/modal/modal.component';
import { LeafletMapComponent } from './pages/leaflet-map/leaflet-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { NavComponent } from './components/nav/nav.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    GlobalMapComponent,
    FuentesOficialesComponent,
    ModalComponent,
    LeafletMapComponent,
    DashboardComponent,
    MapComponent,
    NavComponent,
    DashHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
