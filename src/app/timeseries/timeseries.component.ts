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
// import * as Chart from 'chart.js';
// import * as ChartJsAnnotation from 'chartjs-plugin-annotation';
// import 'chartjs-plugin-crosshair';
interface Misyears {
  value: string;
  viewValue: string;
}

interface QuertLimit {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.css']
})
export class TimeseriesComponent implements OnInit {

  
  public chartReady = false;
  //Time Series
  public lineTimeChartLabels!: Label[];
  public lineTimeChartType: ChartType = 'line';
  public lineTimeChartLegend = true;
  public lineTimeChartPlugins = [];
  public lineTimeChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public lineTimeChartColors: Color[] = [];
  public lineTimeChartOptions: ChartOptions = {};

  public selectedGroupKey: any;
  public selectedYear: any;
  public selectedLimit: any;

  public alphaSeries: any = [];
  public betaSeries: any = [];
  public gammaSeries: any = [];

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
    /*
    this.selectedGroupKey = '07206';
    console.log(this.selectedGroupKey);
    this.spinner.show();
    this.trackingApiService.getTimeSeriesPlotByGroupID(this.selectedGroupKey).subscribe(responseTimeSeries => {
      this.spinner.hide();
      this.chartReady = true;
      console.log(responseTimeSeries.Gamma.Point_Estimate);
      console.log(responseTimeSeries.x);
      this.timeseriesNg2Chart(responseTimeSeries.Gamma.Point_Estimate, responseTimeSeries.x);
      //let timeSeriesPlot = JSON.parse(responseTimeSeries);

      //timeSeriesPlot.forEach((axis: any) => {
        //console.log(axis);
        //this.timeseriesNg2Chart(Alpha, Beta, Gamma);
      //});//this.timeseriesNg2Chart_1(responseTimeSeries.Alpha, responseTimeSeries.Beta, responseTimeSeries.Gamma);
    });
    */
    console.log(this.misYears);
  }

  timeseriesNg2Chart(Alpha: any, Beta: any, Gamma: any, X: any) {
    this.lineTimeChartData = [
      { 
        data: Alpha, 
        label: 'Alpha',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis1',
      },
      { 
        data: Beta, 
        label: 'Beta',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2',
      },
      { 
      data: Gamma, 
      label: 'Gamma',
      fill: false,
      lineTension: 0,
      yAxisID: 'yAxis2',
      }
    ];
    //this.lineTimeChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    //let formated_x =this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.lineTimeChartLabels = X;
    //this.lineChartOptions = {
      //responsive: true,
    //};
    this.lineTimeChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      // scales: {
      //   xAxes: [
      //     {
      //       type: "linear",
      //       position: "bottom"
      //     }
      //   ]
      // }
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Production month",
              },
          }
        ],
        yAxes: [
          {
              display: true,
              id: 'yAxis1',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: "Point Estimate Alpha",
              },
          },
          {
            display: true,
            id: 'yAxis2',
            position: 'right',
            scaleLabel: {
              display: true,
              labelString: "Point Estimate Beta",
            },
          }
        ]
      }
    };
    this.lineTimeChartColors = [
      {
      //borderColor: 'blue',
      //backgroundColor: 'rgb(242, 242, 242)',
      },
    ];
    this.lineTimeChartLegend = true;
    this.lineTimeChartPlugins = [];
    this.lineTimeChartType = 'line';
  }

  onSelectEventYear($event:any, year: Misyears) {
    console.log(year);
    //this.activatedRoute.queryParams.subscribe((params: Params) => {
      //console.log(params.id);
    //});
    //this.selectedGroupKey = '07206';
  }

  onSelectEventLimit($event:any, limit: QuertLimit) {
    console.log(limit);
  }

  filterByGroupID() {
    this.spinner.show();
    this.trackingApiService.getTimeSeriesPlotByGroupID(this.selectedGroupKey).subscribe(responseTimeSeries => {
      this.spinner.hide();
      this.chartReady = true;
      if(responseTimeSeries == '300') {
        alert("Records are not found!!!");
      } else {
        //console.log(responseTimeSeries);
        //console.log(responseTimeSeries.Beta.Point_Estimate);
        //console.log(responseTimeSeries.Gamma.Point_Estimate);
        console.log(responseTimeSeries);
        if('Alpha' in responseTimeSeries) {
          this.alphaSeries = responseTimeSeries.Alpha.Point_Estimate;
        } else {
          this.alphaSeries = [];
        }

        if('Beta' in responseTimeSeries) {
          this.betaSeries = responseTimeSeries.Beta.Point_Estimate;
        } else {
          this.betaSeries = [];
        }

        if('Gamma' in responseTimeSeries) {
          this.gammaSeries = responseTimeSeries.Gamma.Point_Estimate;
        } else {
          this.gammaSeries = [];
        }
      }

      this.timeseriesNg2Chart(this.alphaSeries, this.betaSeries, this.gammaSeries, responseTimeSeries.x);
      //let timeSeriesPlot = JSON.parse(responseTimeSeries);

      //timeSeriesPlot.forEach((axis: any) => {
        //console.log(axis);
        //this.timeseriesNg2Chart(Alpha, Beta, Gamma);
      //});//this.timeseriesNg2Chart_1(responseTimeSeries.Alpha, responseTimeSeries.Beta, responseTimeSeries.Gamma);
    });
  }

  goBack() {
    this.location.back();
  }
}
