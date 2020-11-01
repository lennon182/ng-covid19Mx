import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { GetdataService } from 'src/app/services/getdata.service';


@Component({
  selector: 'app-global-map',
  templateUrl: './global-map.component.html',
  styleUrls: ['./global-map.component.css']
})
export class GlobalMapComponent implements OnInit {

  private data;
  public lineChartData: ChartDataSets[] =  [
    { data: [], label: 'Muertes' },
    { data: [], label: 'Infectados'}
  ];
  public lineChartLabels: Label[];

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    title: {
      display: true,
      text: '🇲🇽 Curva epidemiológica',
      fontSize: 24,
      fontColor: '#33333'
    },
    elements: {
      line: {
        borderWidth: 3,
        fill: false
      },
      point: {
        radius: 3,
        borderWidth: 2,
        backgroundColor: 'white',
        hoverRadius: 7,
        hoverBorderWidth: 2
      }
    },
    tooltips: {
      backgroundColor: '#5c6bc0',
      titleFontSize: 18,
      // mode: 'x'
    },
    layout: {
      padding: {
        bottom: 16,
        top: 16
      }
    },
    legend: {
      labels: {
      }
    }
  };
  public lineChartColors: Color[] = [
    {borderColor: '#b71c1c'},
    { borderColor: '#e65100'},
    {borderColor: '#ffc400'}
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor( private getData: GetdataService) { }

  async ngOnInit() {
    this.data  = await this.getData.getDataChart();
    const labelX =  this.data.map(item => item.Fecha);
    const labelXX = labelX.map(item =>
      new Intl.DateTimeFormat('es-MX', { month: 'long', day: 'numeric', timeZone: 'Australia/Sydney' }).format(new Date(item))
    );
    const muertesChart = this.data.map(item => item.muertes);
    const sospechososChart = this.data.map(item => item.sospechosos );
    const infectadosChart = this.data.map( item => item.infectados);
    this.lineChartLabels = labelXX;
    this.lineChartData = [
    { data: muertesChart, label: 'Muertes'},
    { data: infectadosChart, label: 'Infectados' },
  ];
  }

}
