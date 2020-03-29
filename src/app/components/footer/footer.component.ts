import { Component, OnInit } from '@angular/core';
import { GetdataService } from 'src/app/services/getdata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version: string;

  constructor( private getdata: GetdataService) { }
  date = new Date().getFullYear();
  ngOnInit(): void {
    this.version = this.getdata.version;
  }

}
