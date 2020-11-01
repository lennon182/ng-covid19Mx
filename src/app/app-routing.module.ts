import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GlobalMapComponent } from './pages/global-map/global-map.component';
import { LeafletMapComponent } from './pages/leaflet-map/leaflet-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'home-old', component: HomeComponent},
  {path: 'global-old', component: GlobalMapComponent},
  {path: 'maps-old', component: LeafletMapComponent},
  {path: '**', redirectTo: 'maps', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
