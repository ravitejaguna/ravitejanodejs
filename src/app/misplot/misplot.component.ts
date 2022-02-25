import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions } from "chart.js";
import { Color, Label } from 'ng2-charts';

import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {Tracking} from "../tracking";
import {TrackingService} from "../tracking.service";

import { NgxSpinnerService } from "ngx-spinner";

interface Misyears {
  value: string;
  viewValue: string;
}

interface QuertLimit {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-misplot',
  templateUrl: './misplot.component.html',
  styleUrls: ['./misplot.component.css']
})

export class MisplotComponent implements OnInit {
  public chartReady = false;

  //Time Series
  public linemisTimeChartLabels!: Label[];
  public linemisTimeChartType: ChartType = 'line';
  public linemisTimeChartLegend = true;
  public linemisTimeChartPlugins = [];
  public linemisTimeChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public linemisTimeChartColors: Color[] = [];
  public linemisTimeChartOptions: ChartOptions = {};

  public selectedGroupKey: any;
  public selectedYear: any;
  public selectedLimit: any;


  public misYears: Misyears[] = [
    {value: '2017', viewValue: '2017'},
    {value: '2018', viewValue: '2018'},
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'}
  ];

  public queryLimit: QuertLimit[] = [
    {value: 50000, viewValue: '50000'},
    {value: 100000, viewValue: '100000'},
    {value: 500000, viewValue: '500000'},
    {value: 1000000, viewValue: '1000000'},
    {value: 1000000, viewValue: '1000000'},
    {value: 2000000, viewValue: '2000000'},
    {value: 3000000, viewValue: '3000000'}
  ];

  constructor(
    private trackingApiService: TrackingService,
    private httpService: HttpClient,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.activatedRoute.params.subscribe( params => {
      //console.log(params);
      this.selectedGroupKey = params.id;
    });
  }

  ngOnInit(): void {
    console.log(this.misYears);
  }

  timeseriesNg2Chart(Alpha: any, Beta: any, Gamma: any) {
    //
  }

  misplotNg2Chart(x: any, y: any, y1: any, y2: any, y3: any, y4: any, y5: any, y6 : any, y7 : any, y8 : any, y9 : any) {
   

    this.linemisTimeChartData = [{
      data: y, 
      label: 'Prod Volume',
      fill: false,
      lineTension: 0,
      yAxisID: 'yAxis1',
      },
      {
      data: y1, 
      label: '3',
      fill: false,
      lineTension: 0,
      yAxisID: 'yAxis2'
      },
      { 
        data: y2, 
        label: '6',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      { 
        data: y3, 
        label: '9',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      {
        data: y4, 
        label: '12',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      { 
        data: y5, 
        label: '18',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      { 
        data: y6, 
        label: '24',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      {
      data: y7, 
      label: '36',
      fill: false,
      lineTension: 0,
      yAxisID: 'yAxis2'
      },
      { 
        data: y8, 
        label: '48',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      },
      { 
        data: y9, 
        label: '60',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2'
      }
    ];

    //this.lineTimeChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.linemisTimeChartLabels = x;
    //this.lineChartOptions = {
      //responsive: true,
    //};
    this.linemisTimeChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        yAxes: [
          {
            display: true,
            id: 'yAxis1',
            position: 'left',
            scaleLabel: {
              display: true,
              labelString: "Production volume",
            },
          },
          {
            display: true,
            id: 'yAxis2',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: "Failure Rate",
            },
          }
        ],
        xAxes: [
        {
          scaleLabel: {
          display: true,
          labelString: "Production Month",
          },
        },
        ],
      }
    };
    this.linemisTimeChartColors = [
      {
        borderColor: 'blue',
        backgroundColor: 'rgb(242, 242, 242)',
      },
    ];
    this.linemisTimeChartLegend = true;
    this.linemisTimeChartPlugins = [];
    this.linemisTimeChartType = 'line';
  }

  onSelectEventYear($event:any, year: Misyears) {
    console.log(year);
    //this.activatedRoute.queryParams.subscribe((params: Params) => {
      //console.log(params.id);
    //});
    //this.selectedGroupKey = '07206';
  };

  onSelectEventLimit($event:any, limit: QuertLimit) {
    console.log(limit);
  }

  filterByGroupIDmis() {
    this.spinner.show();
    this.trackingApiService.getMisPlotByGroupID(this.selectedGroupKey, this.selectedYear).subscribe(responseMisPlot => {
      this.spinner.hide();
      this.chartReady = true;
      if(responseMisPlot == '300') {
        alert("Records are not found!!!");
      } else {
        let misPlot = JSON.parse(responseMisPlot);
        misPlot.forEach((axis: any) => {
          console.log(axis);
          if('X_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.X_Values = [];
          }
          if('Y_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y_Values = [];
          }
          if('Y1_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y1_Values = [];
          }
          if('Y2_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y2_Values = [];
          }
          if('Y3_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y3_Values = [];
          }
          if('Y4_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y4_Values = [];
          }
          if('Y5_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y5_Values = [];
          }
          if('Y6_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y6_Values = [];
          }
          if('Y7_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y7_Values = [];
          }
          if('Y8_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y8_Values = [];
          }
          if('Y9_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.Y9_Values = [];
          }

          this.misplotNg2Chart(axis.X_Values, axis.Y_Values, axis.Y1_Values, axis.Y2_Values, axis.Y3_Values, axis.Y4_Values, axis.Y5_Values, axis.Y6_Values,  axis.Y7_Values, axis.Y8_Values, axis.Y9_Values);
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
