import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

declare var am4core;
declare var  am4themes_animated;
declare var covid_world_timeline;
declare var covid_total_timeline;
declare var am4maps;
declare var am4geodata_worldLow;
declare var am4charts;
declare var max;
@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

  data: any;
  constructor( private getData: GetdataService ) { }

  ngOnInit(): void {
    this.getData.getDataGob().then( r => {
      console.log('=====>', r);
    }).catch( e => console.log('ERROR=====>', e));
  }

}
