import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef, ɵConsole } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import { DatePipe, Location, formatDate } from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {Tracking} from "../tracking";
import {TrackingService} from "../tracking.service";
import {Chart} from 'chart.js'

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
//import * as pluginAnnotation from 'chartjs-plugin-annotation';
import { Color, Label } from 'ng2-charts';
import * as c3 from 'c3';
import { NgxSpinnerService } from "ngx-spinner";
import * as Highcharts from "highcharts";
import { checkPropertyChange } from 'json-schema';
import * as d3 from 'c3/node_modules/@types/d3';

declare const Plotly:any;

interface Misyears {
  value: string;
  viewValue: string;
}

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})

export class TrackingComponent implements OnInit {
 
  @ViewChild("productionGraph", { static: false }) productionGraphContainer!: ElementRef;
  // chart:any=[];
  public chartReady = false;
  public chartReadyMIS = false;
  public chartReady2 = false;
  public productionGraph: any;
  public productionGraphData: any;

  public loadingData:any = false;
  public imageBlob: any;
  public img: any;
  public thumbnail: any;

  public histogramChart: any;
  public pdfChart: any;
  public cdfChart: any;
  public misChart: any;
  public TimeseriesChart: any;

  public responseTrackingListByGroupID: any;
  public responseHistogramPlotByGroupID: any;
  public responsePdfPlotByGroupID: any;
  public responseCdfPlotByGroupID: any;
  public responseMisPlotByGroupID: any;
  public responseTimeSeries: any;

  public histogramImageURL: any;
  public pdfImageURL: any;
  public cdfImageURL: any;
  public misImageURL: any;

  public objGroupKey: any = {}
 //Time Series
 public linemisTimeChartLabels!: Label[];
 public linemisTimeChartType: ChartType = 'line';
 public linemisTimeChartLegend = true;
 public linemisTimeChartPlugins = [];
 public linemisTimeChartData!:  ChartDataSets[];
 //public lineChartOptions: any = {};
 public linemisTimeChartColors: Color[] = [];
 public linemisTimeChartOptions: ChartOptions = {};
  //PDF
  public lineChartLabels!: Label[];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public lineChartColors: Color[] = [];
  public lineChartOptions: ChartOptions = {};

  //CDF
  public lineCdfChartLabels!: Label[];
  public lineCdfChartType: ChartType = 'line';
  public lineCdfChartLegend = true;
  public lineCdfChartPlugins = [];
  public lineCdfChartData!:  ChartDataSets[];
  //public lineCdfChartOptions: any = {};
  public lineCdfChartColors: Color[] = [];
  public lineCdfChartOptions: ChartOptions = {};

  //Time Series
  public lineTimeChartLabels!: Label[];
  public lineTimeChartType: ChartType = 'line';
  public lineTimeChartLegend = true;
  public lineTimeChartPlugins = [];
  public lineTimeChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public lineTimeChartColors: Color[] = [];
  public lineTimeChartOptions: ChartOptions = {};

 
 

  

  

  public c3chart: any;

  public tracking: Tracking[] = [];
  public groupKey: any;
  public filteredGroupKey: any;
  public groupKeyDropdown: any;
  public selectedGroupKey: any;
  public selectedVehicleSeries: any;
  public selectedProductionMonth: any;
  public searchCombinedGroupKey: any;

  public selectedEngineSeries: any;
  public selectedProductionMonths: any;

  public seriesDropdown: any;
  public ProductionMonthDropdown: any;
  public selectedCombinedGroupKey: any;

  public trackingListData: any;
  public histogramData: any;
  public pdfData: any;
  public cdfData: any;
  public timeSeriesData: any;

  public alphaSeries: any = [];
  public betaSeries: any = [];
  public gammaSeries: any = [];
  public Alpha_cdf:any;
  public Beta_cdf:any;
  public Alpha_pdf:any;
  public Beta_pdf:any;
  // columns we will show on the table
  //public displayedColumns: string[] = ['Parameter', 'Point_Estimate', 'Standard_Error', 'Lower_CI', 'Upper_CI', 'group_key', 'Date_of_computation', 'seag', 'mileage', 'total_cost', 'strata_unique_id', 'vehicle_production_date', 'vehi_engine_series', 'days_to_failure', 'month_to_failure'];
  public displayedColumns: string[] = ['Parameter', 'Point_Estimate', 'Standard_Error', 'Lower_CI', 'Upper_CI', 'group_key'];

  // public selectedGroupKey: any;
  public selectedYear: any;

  public misYears: Misyears[] = [
    {value: '2017', viewValue: '2017'},
    {value: '2018', viewValue: '2018'},
    {value: '2019', viewValue: '2019'},
    {value: '2020', viewValue: '2020'},
    {value: '2021', viewValue: '2021'}
  ];



  //the source where we will get the data
  public dataSource = new MatTableDataSource<Tracking>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // Fdate: string;

  constructor(
    private trackingApiService: TrackingService,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private router: Router,
    ) {}

    ngAfterViewInit() {
      
      this.dataSource.paginator = this.paginator;
      
    }


    misplotNg2Chart(x: any, y: any, y1: any, y2: any, y3: any, y4: any, y5: any, y6 : any, y7 : any, y8 : any, y9 : any,
                     y10:any,y11:any,y12:any,y13:any,y14:any,y15:any,y16:any,y17:any,y18:any,y19:any,y20:any,y21:any,y22:any,y23:any
                     ,y24:any,y25:any,y26:any,y27:any,y28:any,y29:any,y30:any) {
   

      this.linemisTimeChartData = [{
        data: y, 
        label: 'Production Volume',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis2',
        },
        {
        data: y1, 
        label: '1',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis1'
        },
        { 
          data: y2, 
          label: '2',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y3, 
          label: '3',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        {
          data: y4, 
          label: '4',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y5, 
          label: '5',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y6, 
          label: '6',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        {
        data: y7, 
        label: '7',
        fill: false,
        lineTension: 0,
        yAxisID: 'yAxis1'
        },
        { 
          data: y8, 
          label: '8',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y9, 
          label: '9',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y10, 
          label: '10',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y11, 
          label: '11',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y12, 
          label: '12',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y13, 
          label: '13',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y14, 
          label: '14',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y15, 
          label: '15',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y16, 
          label: '16',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y17, 
          label: '17',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y18, 
          label: '18',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y19, 
          label: '19',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y20, 
          label: '20',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y21, 
          label: '21',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y22, 
          label: '22',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y23, 
          label: '23',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y24, 
          label: '24',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y25, 
          label: '25',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y26, 
          label: '26',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y27, 
          label: '27',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y28, 
          label: '28',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y29, 
          label: '29',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        },
        { 
          data: y30, 
          label: '30',
          fill: false,
          lineTension: 0,
          yAxisID: 'yAxis1'
        }
      ];
  
      //this.lineTimeChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      this.linemisTimeChartLabels = x;
      //this.lineChartOptions = {
        //responsive: true,
      //};
      this.linemisTimeChartOptions = {
        responsive: true,

        elements: {
          point: {
            radius: 0,
          },
          line: {
            borderWidth: 0.5
          }
        },
        // We use these empty structures as placeholders for dynamic theming.
        scales: {
          yAxes: [
           
            {
              display: true,
              id: 'yAxis1',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: "Failure Rate",
              },
              ticks: {
                // beginAtZero: true,
                // stepValue: 10,
                // steps: 20,
                // max : 0.02,
              }
            },
            {
              display: true,
              id: 'yAxis2',
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: "Production volume",
              },
              ticks: {
                beginAtZero: true,
                // stepValue: 10,
                // steps: 20,
                min:0,
                // max : 2500,
              }
            },
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


    ngOnInit(): void {
      // console.log(this.misYears);
      
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      //this.spinner.hide();
    }, 5000);

  
   

    this.trackingApiService.getGroupKey().subscribe((groupKey: any) => {
      this.spinner.hide();
      //this.groupKeyDropdown = groupKey.map((a:any) => a.GroupKey);
      let groupKey1: any[] = [];
      let groupKey2: any[] = [];
      let groupKey3: any[] = [];

      groupKey.forEach((x: any) => {
        let groupKeyCombined = x.GroupKey.toString().split("_");
        groupKey1.push(groupKeyCombined[0]);
        groupKey2.push(groupKeyCombined[1]);
        groupKey3.push(groupKeyCombined[2]);
      });

      this.groupKeyDropdown = [...new Set(groupKey1)];
      this.seriesDropdown = [...new Set(groupKey2)];
      this.ProductionMonthDropdown = [...new Set(groupKey3)];
    });
  }

 

  filterByGroupID() {
    this.spinner.show();
    // this.chartReady2=true
    if(this.selectedVehicleSeries == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey
    } else if(this.selectedProductionMonth == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries
    } else {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries+"_"+this.selectedProductionMonth;
    }

    this.trackingApiService.requestDataFromMultipleSourcesTrackingView(this.selectedCombinedGroupKey).
        subscribe(([responseTrackingList,responseTimeSeries]) => {
        this.spinner.hide();
        this.loadingData = true;
        this.chartReady = true;
        this.trackingListData = responseTrackingList;
        this.timeSeriesData   = responseTimeSeries;
        // console.log('resp Timeseries:',responseTimeSeries)
        // console.log('Timeseries:',this.timeSeriesData)
        

        //Table view
        if(responseTrackingList) {
          this.loadingData = true;
          this.dataSource.data = this.trackingListData;
        }
        
        // Timeseries1
        if(responseTimeSeries) {
          if('Alpha' in this.timeSeriesData) {
            this.alphaSeries = this.timeSeriesData.Alpha.Point_Estimate;
          } else {
            this.alphaSeries = [];
          }

          if('Beta' in this.timeSeriesData) {
            this.betaSeries = this.timeSeriesData.Beta.Point_Estimate;
          } else {
            this.betaSeries = [];
          }

          if('Gamma' in this.timeSeriesData) {
            this.gammaSeries = this.timeSeriesData.Gamma.Point_Estimate;
          } else {
            this.gammaSeries = [];
          }
        }
        this.timeseriesC3Chart(this.alphaSeries, this.betaSeries, this.gammaSeries, this.timeSeriesData.x);
      });
     
  }

  filterByGroupIDmis() {
    this.spinner.show();
    if(this.selectedVehicleSeries == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey
    } else if(this.selectedProductionMonth == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries
    } else {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries+"_"+this.selectedProductionMonth;
    }
    this.trackingApiService.getMisPlotByGroupID(this.selectedCombinedGroupKey, this.selectedYear).subscribe(responseMisPlot => 
      {
      this.spinner.hide();
      console.log('MIS')
      console.log('GroupKey:',this.selectedGroupKey)
      console.log('GroupKey:',this.selectedGroupKey)
      console.log('selectedYear:',this.selectedYear)
      let misPlot1 = JSON.parse(JSON.stringify(responseMisPlot));
      // console.log('misPlot1:',misPlot1)
    
      
      this.chartReadyMIS = true;
      if(responseMisPlot == '300') {
        alert("Records are not found!!!");
      } else {
        // let misPlot = JSON.parse(responseMisPlot);
        
        // let misPlot = responseMisPlot;
        // console.log('json-misPlot',misPlot);
        misPlot1.forEach((axis: any) => {
          console.log('start-new:',axis);
          if('X_Values' in axis) {
            axis.X_Values = axis.X_Values;
          } else {
            axis.X_Values = [];
          }
          if('Y_Values' in axis) {
            axis.Y_Values = axis.Y_Values;
          } else {
            axis.Y_Values = [];
          }
          if('Y1_Values' in axis) {
            axis.Y1_Values = axis.Y1_Values;
          } else {
            axis.Y1_Values = [];
          }
          if('Y2_Values' in axis) {
            axis.Y2_Values = axis.Y2_Values;
          } else {
            axis.Y2_Values = [];
          }
          if('Y3_Values' in axis) {
            axis.Y3_Values = axis.Y3_Values;
          } else {
            axis.Y3_Values = [];
          }
          if('Y4_Values' in axis) {
            axis.Y4_Values = axis.Y4_Values;
          } else {
            axis.Y4_Values = [];
          }
          if('Y5_Values' in axis) {
            axis.Y5_Values = axis.Y5_Values;
          } else {
            axis.Y5_Values = [];
          }
          if('Y6_Values' in axis) {
            axis.Y6_Values = axis.Y6_Values;
          } else {
            axis.Y6_Values = [];
          }
          if('Y7_Values' in axis) {
            axis.Y7_Values = axis.Y7_Values;
          } else {
            axis.Y7_Values = [];
          }
          if('Y8_Values' in axis) {
            axis.Y8_Values = axis.Y8_Values;
          } else {
            axis.Y8_Values = [];
          }
          if('Y9_Values' in axis) {
            axis.Y9_Values = axis.Y9_Values;
          } else {
            axis.Y9_Values = [];
          }
          if('Y10_Values' in axis) {
            axis.Y10_Values = axis.Y10_Values;
          } else {
            axis.Y10_Values = [];
          }
          if('Y11_Values' in axis) {
            axis.Y11_Values = axis.Y11_Values;
          } else {
            axis.Y11_Values = [];
          }
          if('Y12_Values' in axis) {
            axis.Y12_Values = axis.Y12_Values;
          } else {
            axis.Y12_Values = [];
          }
          if('Y13_Values' in axis) {
            axis.Y13_Values = axis.Y13_Values;
          } else {
            axis.Y13_Values = [];
          }
          if('Y14_Values' in axis) {
            axis.Y14_Values = axis.Y14_Values;
          } else {
            axis.Y14_Values = [];
          }
          if('Y15_Values' in axis) {
            axis.Y15_Values = axis.Y15_Values;
          } else {
            axis.Y15_Values = [];
          }
          if('Y16_Values' in axis) {
            axis.Y16_Values = axis.Y16_Values;
          } else {
            axis.Y16_Values = [];
          }
          if('Y17_Values' in axis) {
            axis.Y17_Values = axis.Y17_Values;
          } else {
            axis.Y17_Values = [];
          }
          if('Y18_Values' in axis) {
            axis.Y18_Values = axis.Y18_Values;
          } else {
            axis.Y18_Values = [];
          }
          if('Y19_Values' in axis) {
            axis.Y19_Values = axis.Y19_Values;
          } else {
            axis.Y19_Values = [];
          }
          if('Y20_Values' in axis) {
            axis.Y20_Values = axis.Y20_Values;
          } else {
            axis.Y20_Values = [];
          }
          if('Y21_Values' in axis) {
            axis.Y21_Values = axis.Y21_Values;
          } else {
            axis.Y21_Values = [];
          }
          if('Y22_Values' in axis) {
            axis.Y22_Values = axis.Y22_Values;
          } else {
            axis.Y22_Values = [];
          }
          if('Y23_Values' in axis) {
            axis.Y23_Values = axis.Y23_Values;
          } else {
            axis.Y23_Values = [];
          }
          if('Y24_Values' in axis) {
            axis.Y24_Values = axis.Y24_Values;
          } else {
            axis.Y24_Values = [];
          }
          if('Y25_Values' in axis) {
            axis.Y25_Values = axis.Y25_Values;
          } else {
            axis.Y25_Values = [];
          }
          if('Y26_Values' in axis) {
            axis.Y26_Values = axis.Y26_Values;
          } else {
            axis.Y26_Values = [];
          }
          if('Y27_Values' in axis) {
            axis.Y27_Values = axis.Y27_Values;
          } else {
            axis.Y27_Values = [];
          }
          if('Y28_Values' in axis) {
            axis.Y28_Values = axis.Y28_Values;
          } else {
            axis.Y28_Values = [];
          }
          if('Y29_Values' in axis) {
            axis.Y29_Values = axis.Y29_Values;
          } else {
            axis.Y29_Values = [];
          }
          if('Y30_Values' in axis) {
            axis.Y30_Values = axis.Y30_Values;
          } else {
            axis.Y30_Values = [];
          }
         
          this.misplotNg2Chart(axis.X_Values, axis.Y_Values, axis.Y1_Values, axis.Y2_Values, axis.Y3_Values, axis.Y4_Values,
             axis.Y5_Values, axis.Y6_Values,  axis.Y7_Values, axis.Y8_Values, axis.Y9_Values,axis.Y10_Values,axis.Y11_Values,axis.Y12_Values,
             axis.Y13_Values,axis.Y14_Values,axis.Y15_Values,axis.Y16_Values,axis.Y17_Values,axis.Y18_Values
             ,axis.Y19_Values,axis.Y20_Values,axis.Y21_Values,axis.Y22_Values,axis.Y23_Values,axis.Y24_Values,axis.Y25_Values,axis.Y26_Values
             ,axis.Y27_Values,axis.Y28_Values,axis.Y29_Values,axis.Y30_Values);
        });
      }
    });
  }

  fetchGraphData(Fdate: string) {
    // console.log(Fdate)
    this.spinner.show();
    if(this.selectedVehicleSeries == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey
    } else if(Fdate == 'all') {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries
    } else {
      this.selectedCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedVehicleSeries+"_"+ Fdate;
      // console.log('Selected Key:',this.selectedCombinedGroupKey)
    }

    this.trackingApiService.requestDataFromChartsTrackingView(this.selectedCombinedGroupKey).
        subscribe(([responseHistogram,responsePDF,responseCDF]) => {
        this.spinner.hide();
        this.loadingData = true;
        this.chartReady = true;

        // this.trackingListData = responseTrackingList;
        this.histogramData    = responseHistogram;
        this.pdfData          = responsePDF;
        this.cdfData          = responseCDF;
        // this.timeSeriesData   = responseTimeSeries;

       

        // Histogram
        if(responseHistogram) {
          this.loadingData = true;
          this.chartReady = true;
          //console.log("Histogram Plotly: ", this.histogramChart);
          let failure: any[] = [];
          this.histogramData.forEach((x: any) => {
            failure.push(x.month_to_failure);
          });
          this.histogramPlotly(failure);
        }

        // PDF
        if(responsePDF) {
          this.chartReady = true;
          this.probabilityDistributionChart(this.pdfData);
        }

        //CDF
        if(responseCDF) {
          this.chartReady = true;
          this.cumulativeDistributionChart(this.cdfData);
          this.weibullC3Chart1(this.cdfData,this.pdfData);
        }

        this.timeseriesC3Chart(this.alphaSeries, this.betaSeries, this.gammaSeries, this.timeSeriesData.x);
        this.weibullC3Chart();
       
      }
      
      
      );
  }


 

  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  public histogramPlotly(x: any) {
    var data = [
      {
        x: x,
        //name: 'Total month to failure',
        type: 'histogram',
        histnorm: 'probability',
        marker: {
              color: '100, 180, 255',
              line: {
                width: 1
              }
          },
      }
    ];

    var layout = {
      xaxis: {title: "Month to failure"},
      yaxis: {title: "Failure Rate"},
     
      };

    Plotly.newPlot('histogramChart', data, layout, {displayModeBar: false});
  }

 

  probabilityDistributionChart(responsePdf: any) {
    let pdfPlot = JSON.parse(responsePdf);

    let roundedX: any = [];
    pdfPlot.forEach((axis: any) => {
      axis.X.forEach((xaxis: any) => {
        roundedX.push(parseFloat(xaxis).toFixed(3));
      });

      this.Alpha_pdf = axis.Alpha
      this.Beta_pdf = axis.Beta

    // this.lineChartData = [
    //   { data: axis.Y, label: `Alpha ${axis.Alpha} Beta ${axis.Beta}`, fill: true, showLine: true },
    // ];
    // this.lineChartLabels = axis.X;

    var Xaxis = axis.X;
    var y_pdf = axis.Y;
   

    y_pdf = ['Alpha', ...axis.Y];
    Xaxis = ['x', ...axis.X];
   console.log('PDF')
   console.log(y_pdf)
   console.log(Xaxis)
    var chartpdf = c3.generate({
      // el: "#home",
      data: {
          x: 'x',
          columns: [
            Xaxis,
            y_pdf
            // console.log(x_cdf,y_cdf)
          ],
          
          types: {
          
            Alpha: 'area-spline'
            
          },
          
          
      },
      legend: {
        show: false
    },
      axis: {
        
        x: {
         
            type: 'category',
            tick: {
                rotate: -75,
                multiline: false,
               
                culling: {
                  max: 30
              }
            },
            show:true,
            label:{
              text: 'Duration In Months',
              position: 'outer-center'
            },
            // height: 130
        },
        y: {
          show: true,
            label: {
              text: 'Probability Density',
              position: 'outer-middle'
            }  ,
            
        }
        
    },
    bindto: '#chartpdf',
    point: {
      r: 1,
    },
  }
  
  
  );
    
  });
  }

 

  cumulativeDistributionChart(responseCdf: any) {
      // console.log('CDF:',responseCdf)
      let cdfPlot = JSON.parse(responseCdf);
      // console.log('JSON-CDF:',cdfPlot)
      let roundedX: any = [];
      cdfPlot.forEach((axis: any) => {
        axis.X.forEach((xaxis: any) => {
          roundedX.push(parseFloat(xaxis).toFixed(2));
        });
        this.Alpha_cdf = axis.Alpha
        this.Beta_cdf = axis.Beta
      //  console.log('unround:',axis.X)
        // this.lineCdfChartData = [
        //   { data: axis.Y, label: `Alpha ${axis.Alpha} Beta ${axis.Beta}`, fill: true, showLine: true },
        // ];
        // this.lineCdfChartLabels = axis.X;
     

      var Xaxis = axis.X;
      var y_cdf = axis.Y;
   

    y_cdf = ['Alpha', ...axis.Y];
    Xaxis = ['x', ...axis.X];
    // Xaxis = parseFloat(Xaxis).toFixed(2);
    // console.log('Xaxis:',Xaxis)
    // console.log('y_cdf:',y_cdf)
    var chartcdf = c3.generate({
     
      data: {
          x: 'x',
          columns: [
            Xaxis,
            y_cdf
            // console.log(x_cdf,y_cdf)
          ],
          
          types: {
          
              Alpha: 'area-spline'
          }
          
      },
      legend: {
        show: false
    },
      axis: {
        x: {
            type: 'category',
            tick: {
                rotate: -75,
                multiline: false,
               
                culling: {
                  max: 30
              }
            },
            show:true,
            label:{
              text: 'Duration in months',
              position: 'outer-center'
            },
        },
        y: {
          show: true,
            label: {
              text: 'Probability Density',
              position: 'outer-middle'
            }  
        }
        
    },
    bindto: '#chartcdf',
    point: {
      r: 1,
    },
  });
    
      });
  }

  selectedGoupKey(value: any) {
    // console.log(value);
    this.selectedGroupKey = value;
  }

  dropdownVehicleSeries(value: any) {
    // console.log(value);
    this.selectedEngineSeries = value;
    this.searchCombinedGroupKey = this.selectedGroupKey+"_"+this.selectedEngineSeries;
  }

  dropdownProductionMonth(value: any) {
    // console.log(value);
    this.selectedProductionMonths = value;
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
  
    this.lineTimeChartLabels = X;
   
    this.lineTimeChartOptions = {
      responsive: true,
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
             
              labelString: "Point Estimate Beta and Gamma",
            },
          }
        ]
      },
      
    };
    this.lineTimeChartColors = [
      {
      },
    ];
    this.lineTimeChartLegend = true;
    this.lineTimeChartPlugins = [];
    this.lineTimeChartType = 'line';
  }
 
  timeseriesC3Chart(Alpha: any, Beta: any, Gamma: any, X: any) {
  
    var Alpha = Alpha;
    var Beta = Beta;
    var Gamma = Gamma;
    var Xaxis = X;

    Alpha = ['Alpha', ...Alpha];
    Beta = ['Beta', ...Beta];
    Gamma = ['Gamma', ...Gamma];
    Xaxis = ['x', ...Xaxis];
    // console.log('Alpha-new',Alpha)
    // console.log('x-axis',Xaxis)
    var chart = c3.generate({
      data: {
          x: 'x',
          columns: [
              Xaxis,
              Alpha,
              Beta,
              Gamma
          ],
          
          onclick:  (e) => { 
            console.log(e);  
            console.log(e.value);  
            let prodDate = e.x
            console.log(prodDate);
            let finalDate = formatDate(prodDate, 'yyyy-MM-dd', 'en-US')
            console.log(finalDate);
            this.fetchGraphData(finalDate)
        },
    
      
          axes: {
            Alpha: 'y',
            Beta:'y2',
            Gamma:'y2'
          }
          
      },
      axis: {
          x: {
              type: 'timeseries',
              label:{
                text: 'Production In Month',
                position: 'outer-center'
              },
              tick: {
                  format: '%Y-%m-%d'
              },
          },
          y: {
            show: true,
            // tick: {
            //   format: function (d) { 
            //     return  Math.round(d/1000) + 'K'; 
            //   }
            // },
            label: {
              text: 'Point Estimate Alpha',
              position: 'outer-middle',
            
            },
           
          },
          y2: {
            show: true,
            label: {
              text: 'Point Estimate Beta and Gamma',
              position: 'outer-middle'
            }
          },
      },
      bindto: '#chart1'
    }
    );
    
 
  }

  weibullC3Chart(){

 
    var chartweibull = c3.generate({
      data: {
           
          xs:{
           
            No_of_claims:'scatterx',
            // lineregy:'lineregx',
            // lineyupperCI:'linexupperCI',
            // lineylowerCI:'linexlowerCI',
           
          },
          
         
          // iris data from R
          columns: [
              ["scatterx",160.1312261883,246.2565758985,2.3132780015,130.7478595533,86.7459553803,67.7447638939,98.879604115,141.9096790797,154.9714576988,191.840961543,160.6852669447,234.5303711598,104.171817809,316.6486137118,36.2271854614,229.8284475077,160.203337131,197.2345107199,84.6854927332,102.3417922196,277.1507245395,405.6061695166,133.631642361,236.8388193085,315.5857014062,327.4207240858,64.8808216838,43.4052441959,93.9537548929,316.6641144954,70.0325427036,161.1732942214,388.599246018,190.3226966707,236.6931422466,134.1736337058,234.9446057014,292.7529255137,29.5238735709,256.9412820852,463.1943919621,256.208198424,125.0021424504,272.2935595633,71.8477912547,168.0252897761,337.6420173435,128.468752891,126.9356226111,81.2574168482],


              ["No_of_claims",47.0238095238,72.8174603175,1.3888888889,37.1031746032,21.2301587302,11.3095238095,25.1984126984,43.0555555556,45.0396825397,58.9285714286,50.9920634921,64.880952381,29.1666666667,86.7063492063,5.3571428571,62.8968253968,49.0079365079,60.9126984127,19.246031746,27.1825396825,80.753968254,96.626984127,39.0873015873,70.8333333333,84.7222222222,90.6746031746,9.3253968254,7.3412698413,23.2142857143,88.6904761905,13.2936507937,52.9761904762,94.6428571429,56.9444444444,68.8492063492,41.0714285714,66.8650793651,82.7380952381,3.373015873,76.7857142857,98.6111111111,74.8015873016,31.1507936508,78.7698412698,15.2777777778,54.9603174603,92.6587301587,35.119047619,33.1349206349,17.2619047619],


              // ['lineregy',0.0,0.01,0.0503284939,0.1214479828,0.2232408646,0.3555782161,0.5183116588,0.7112702752,0.934259199,1.1870589484,1.4694251522,1.7810885131,2.1217549294,2.4911057304,2.8887979991,3.3144649672,3.7677164697,4.2481394512,4.7552985202,5.2887365435,5.8479752797,6.4325160484,7.04184043,7.6754109973,8.3326720729,9.0130505133,9.7159565157,10.4407844458,11.1869136855,11.9537094973,12.7405239049,13.5466965862,14.3715557788,15.2144191953,16.0745949456,16.9513824661,17.8440734529,18.751952797,19.6742995211,20.6103877142,21.5594874642,22.5208657854,23.4937875404,24.4775163534,25.4713155152,26.4744488761,27.4861817273,28.5057816678,29.5325194564,30.5656698469,31.6045124056,32.6483323091,33.6964211227,34.7480775567,35.8026082002,36.859328232,37.9175621064,38.9766442147,40.0359195198,41.0947441645,42.1524860524,43.2085254011,44.2622552664,45.3130820384,46.3604259074,47.403721301,48.4424172913,49.4759779719,50.5038828052,51.525626939,52.5407214941,53.548693821,54.5490877273,55.5414636755,56.5253989512,57.500487803,58.4663415527,59.4225886788,60.3688748712,61.304863059,62.2302334122,63.1446833173,64.0479273268,64.9396970858,65.8197412329,66.6878252795,67.5437314658,68.3872585962,69.218221853,70.0364525917,70.841798116,71.634121436,72.4133010087,73.1792304627,73.9318183071,74.6709876272,75.396675766,76.1088339935,76.8074271652,77.4924333692,78.1638435645,78.8216612101,79.4659018874,80.0965929144,80.7137729555,81.3174916251,81.9078090879,82.4847956554,83.0485313804,83.5991056492,84.1366167737,84.661171583,85.1728850154,85.6718797121,86.158285613,86.6322395549,87.093884873,87.5433710066,87.9808531089,88.4064916624,88.8204520991,89.2229044274,89.6140228651,89.9939854792,90.3629738337,90.721172644,91.0687694404,91.4059542388,91.7329192213,92.0498584242,92.3569674363,92.6544431056,92.9424832562,93.2212864135,93.4910515409,93.7519777845,94.0042642289,94.2481096621,94.4837123508,94.7112698255,94.9309786751,95.1430343519,95.3476309861,95.5449612102,95.7352159926,95.9185844811,96.0952538561,96.2654091918,96.4292333283,96.5869067506,96.7386074785,96.884510963,97.0247899929,97.1596146078,97.2891520209,97.4135665479,97.5330195445,97.6476693504,97.7576712413,97.8631773866,97.9643368143,98.0612953823,98.1541957553,98.2431773882,98.3283765141,98.4099261386,98.4879560386,98.5625927661,98.6339596569,98.7021768429,98.767361269,98.8296267144,98.8890838162,98.9458400979,99.0,99.0,99.1262332248,99.2395444895,99.3408495777,99.4310476398,99.511016048,99.5816056897,99.643636748,99.697895009,99.7451287255,99.7860460584,99.8213131038,99.8515525044,99.877342634,99.8992173331,99.9176661642,99.9331351467,99.9460279277,99.9567073332,99.9654972465,99.9726847533,99.9785224951,99.9832311705,99.9870021286,99.99],
              // ['linexupperCI',0.0,0.05,0.1022522923,0.1798819686,0.2868781833,0.4269964177,0.6038028614,0.8207039244,1.0809668031,1.3877342565,1.744035428,2.1527938481,2.6168333598,3.1388824699,3.7215774807,4.3674646601,5.0790016399,5.8585581901,6.708416481,7.6307709242,8.6277276659,9.7013037901,10.8534262845,12.0859308101,13.4005603102,14.7989634931,16.2826932137,17.8532047813,19.5118542156,21.2598964713,23.0984836503,25.0286632201,27.0513762534,29.1674557062,31.3776247465,33.6824951498,36.0825657733,38.578221121,41.1697300115,43.8572443611,46.6407980908,49.5203061684,52.4955637958,55.566245749,58.7319058813,61.9919767955,65.3457696944,68.7924744154,72.3311596557,75.9607733937,79.6801435124,83.4879786278,87.3828691276,91.3632884225,95.4275944128,99.5740311725,103.8007308509,108.1057157938,112.4869008825,116.9420960904,121.4690092552,126.0652490644,130.7283282503,135.4556669919,140.2445965173,145.0923629025,149.9961310603,154.9529889118,159.959951734,165.0139666749,170.1119174265,175.2506290484,180.4268729294,185.6373718786,190.8788053333,196.1478146737,201.4410086304,206.7549687732,212.0862550692,217.4314114944,222.7869716874,228.1494646307,233.5154203447,238.8813755816,244.2438795038,249.5994993321,254.9448259511,260.276479455,265.5911146214,270.8854262981,276.156154689,281.4000905261,286.6140801131,291.7950302293,296.939912879,302.0457698769,307.1097172553,312.1289494842,317.1007434927,322.0224624822,326.891559522,331.7055809195,336.462169357,341.1590667876,345.7941170853,350.3652684431,354.8705755147,359.3082012967,363.6764187485,367.9736121471,372.1982781772,376.3490267555,380.4245815905,384.4237804787,388.3455753411,392.1890320011,395.9533297103,399.6377604253,403.2417278422,406.7647461946,410.2064388226,413.5665365205,416.8448756716,420.041396179,423.1561392016,426.1892447068,429.1409488481,432.0115811809,434.801561726,437.511397893,440.1416812758,442.6930843318,445.166356957,447.5623229694,449.8818765129,452.1259783948,454.2956523674,456.3919813682,458.4161037293,460.3692093676,462.2525359686,464.0673651743,465.8150187869,467.4968549977,469.1142646531,470.6686675665,472.1615088856,473.5942555251,474.9683926714,476.2854203689,477.5468501944,478.7542020265,479.9090009172,481.0127740695,482.067047928,483.0733453866,484.0331831156,484.9480690148,485.819499792,486.6489586714,487.4379132331,488.187813384,488.900089462,489.5761504727,490.2173824587,490.8251470004,491.4007798474,491.945589678,492.4608569861,492.9478330915,493.4077392718,493.8417660125,494.2510723714,494.6367854547,495.0,495.0,495.6311661242,496.1977224475,496.7042478884,497.1552381988,497.5550802398,497.9080284484,498.2181837402,498.489475045,498.7256436274,498.9302302922,499.1065655192,499.2577625219,499.3867131699,499.4960866657,499.5883308208,499.6656757335,499.7301396385,499.783536666,499.8274862323,499.8634237664,499.8926124754,499.9161558524,499.9350106431,499.95],
              //  ['lineyupperCI',0.0,0.01,0.0204504585,0.0359763937,0.0573756367,0.0853992835,0.1207605723,0.1641407849,0.2161933606,0.2775468513,0.3488070856,0.4305587696,0.523366672,0.627776494,0.7443154961,0.873492932,1.015800328,1.171711638,1.3416832962,1.5261541848,1.7255455332,1.940260758,2.1706852569,2.417186162,2.680112062,2.9597926986,3.2565386427,3.5706409563,3.9023708431,4.2519792943,4.6196967301,5.005732644,5.4102752507,5.8334911412,6.2755249493,6.73649903,7.2165131547,7.7156442242,8.2339460023,8.7714488722,9.3281596182,9.9040612337,10.4991127592,11.1132491498,11.7463811763,12.3983953591,13.0691539389,13.7584948831,14.4662319311,15.1921546787,15.9360287025,16.6975957256,17.4765738255,18.2726576845,19.0855188826,19.9148062345,20.7601461702,21.6211431588,22.4973801765,23.3884192181,24.293801851,25.2130498129,26.1456656501,27.0911333984,28.0489193035,29.0184725805,29.9992262121,30.9905977824,31.9919903468,33.002793335,34.0223834853,35.0501258097,36.0853745859,37.1274743757,38.1757610667,39.2295629347,40.2882017261,41.3509937546,42.4172510138,43.4862822989,44.5573943375,45.6298929261,46.7030840689,47.7762751163,48.8487759008,49.9198998664,50.9889651902,52.055295891,53.1182229243,54.1770852596,55.2312309378,56.2800181052,57.3228160226,58.3590060459,59.3879825758,60.4091539754,61.4219434511,62.4257898968,63.4201486985,64.4044924964,65.3783119044,66.3411161839,67.2924338714,68.2318133575,69.1588234171,70.0730536886,70.9741151029,71.8616402593,72.7352837497,73.5947224294,74.4396556354,75.2698053511,76.0849163181,76.8847560957,77.6691150682,78.4378064002,79.1906659421,79.9275520851,80.6483455684,81.3529492389,82.0412877645,82.7133073041,83.3689751343,84.0082792358,84.6312278403,85.2378489414,85.8281897696,86.4023162362,86.9603123452,87.5022795786,88.0283362552,88.5386168664,89.0332713914,89.5124645939,89.9763753026,90.425195679,90.8591304735,91.2783962736,91.6832207459,92.0738418735,92.4505071937,92.8134730349,93.1630037574,93.4993709995,93.8228529306,94.1337335133,94.4323017771,94.718851105,94.9936785343,95.2570840738,95.5093700389,95.7508404053,95.9818001834,96.2025548139,96.4134095856,96.6146690773,96.8066366231,96.989613803,97.1638999584,97.3297917343,97.4875826466,97.6375626768,97.7800178924,97.9152300945,98.0434764917,98.1650294001,98.2801559695,98.3891179356,98.4921713972,98.5895666183,98.6815478544,98.7683532025,98.8502144743,98.9273570909,99.0,99.0,99.1262332248,99.2395444895,99.3408495777,99.4310476398,99.511016048,99.5816056897,99.643636748,99.697895009,99.7451287255,99.7860460584,99.8213131038,99.8515525044,99.877342634,99.8992173331,99.9176661642,99.9331351467,99.9460279277,99.9567073332,99.9654972465,99.9726847533,99.9785224951,99.9832311705,99.9870021286,99.99],
              //  ['linexlowerCI',0.0,0.05,1.3422319069,3.4365334955,6.0650126898,9.1166889441,12.5237402197,16.2381800091,20.2231637196,24.4488785696,28.8903094489,33.5259051789,38.3367263652,43.3058720571,48.4180779102,53.659425049,59.0171232288,64.4793455133,70.0350996584,75.6741262707,81.3868168919,87.1641471771,92.9976216839,98.8792277173,104.801396324,110.7569689926,116.7391689554,122.741576232,128.758105743,134.7829879616,140.8107516765,146.8362085248,152.8544390167,158.8607798258,164.8508121581,170.8203510466,176.7654354429,182.6823190003,188.5674614585,194.4175205546,200.229344397,205.9999642497,211.7265876792,217.4065920267,223.0375181717,228.6170645584,234.143081461,239.6135654662,245.0266541545,250.3806209657,255.6738702343,260.9049323824,266.0724592611,271.1752196307,276.2120947723,281.1820742231,286.084251631,290.917820722,295.6820713759,300.376385807,305.0002348457,309.553174317,314.0348415151,318.444951769,322.7832950988,327.0497329598,331.2441950718,335.3666763333,339.4172338178,343.3959838512,347.3030991685,351.1388061489,354.9033821277,358.5971527837,362.2204896016,365.7738074067,369.2575619728,372.6722477005,376.0183953657,379.2965699368,382.50736846,385.651418011,388.7293737125,391.7419168162,394.6897528485,397.5736098184,400.3942364868,403.1524006963,405.8488877597,408.4844989071,411.0600497896,413.5763690391,416.0342968831,418.4346838121,420.7783893012,423.0662805817,425.2992314638,427.478121208,429.6038334453,431.6772551435,433.6992756198,435.670785598,437.5926763097,439.4658386372,441.2911622985,443.0695350722,444.8018420623,446.4889649997,448.1317815825,449.7311648508,451.2879825976,452.8030968127,454.2773631601,455.7116304866,457.1067403619,458.4635266481,459.7828150981,461.0654229818,462.3121587399,463.5238216623,464.701201593,465.8450786583,466.9562230187,468.0353946427,469.0833431025,470.1008073905,471.0885157551,472.0471855565,472.9775231394,473.8802237246,474.7559713166,475.605438627,476.4292870139,477.2281664354,478.0027154169,478.7535610323,479.4813188968,480.1865931726,480.8699765853,481.5320504517,482.1733847171,482.7945380023,483.3960576607,483.9784798423,484.5423295673,485.0881208061,485.6163565672,486.127528991,486.6221194506,487.1005986576,487.5634267736,488.0110535267,488.4439183322,488.8624504179,489.2670689529,489.6581831802,490.0361925519,490.4014868684,490.7544464185,491.0954421232,491.4248356807,491.7429797135,492.0502179165,492.3468852072,492.6333078756,492.9098037363,493.17668228,493.4342448262,493.6827846756,493.9225872624,494.1539303074,494.3770839693,494.5923109971,494.7998668803,495.0,495.0,495.6311661242,496.1977224475,496.7042478884,497.1552381988,497.5550802398,497.9080284484,498.2181837402,498.489475045,498.7256436274,498.9302302922,499.1065655192,499.2577625219,499.3867131699,499.4960866657,499.5883308208,499.6656757335,499.7301396385,499.783536666,499.8274862323,499.8634237664,499.8926124754,499.9161558524,499.9350106431,499.95],
              // ['lineylowerCI',0.0,0.01,0.2684463814,0.6873066991,1.213002538,1.8233377888,2.5047480439,3.2476360018,4.0446327439,4.8897757139,5.7780618898,6.7051810358,7.667345273,8.6611744114,9.683615582,10.7318850098,11.8034246458,12.8958691027,14.0070199317,15.1348252541,16.2773633784,17.4328294354,18.5995243368,19.7758455435,20.9602792648,22.1513937985,23.3478337911,24.5483152464,25.7516211486,26.9565975923,28.1621503353,29.367241705,30.5708878033,31.7721559652,32.9701624316,34.1640702093,35.3530870886,36.5364638001,37.7134922917,38.8835041109,40.0458688794,41.1999928499,42.3453175358,43.4813184053,44.6075036343,45.7234129117,46.8286162922,47.9227130932,49.0053308309,50.0761241931,51.1347740469,52.1809864765,53.2144918522,54.2350439261,55.2424189545,56.2364148446,57.2168503262,58.1835641444,59.1364142752,60.0752771614,61.0000469691,61.9106348634,62.806968303,63.6889903538,64.5566590198,65.409946592,66.2488390144,67.0733352667,67.8834467636,68.6791967702,69.4606198337,70.2277612298,70.9806764255,71.7194305567,72.4440979203,73.1547614813,73.8515123946,74.5344495401,75.2036790731,75.8593139874,76.501473692,77.1302836022,77.7458747425,78.3483833632,78.9379505697,79.5147219637,80.0788472974,80.6304801393,81.1697775519,81.6968997814,82.2120099579,82.7152738078,83.2068593766,83.6869367624,84.1556778602,84.6132561163,85.0598462928,85.4956242416,85.9207666891,86.3354510287,86.739855124,87.1341571196,87.5185352619,87.8931677274,88.2582324597,88.6139070144,88.9603684125,89.2977929999,89.6263563165,89.9462329702,90.2575965195,90.5606193625,90.855472632,91.1423260973,91.4213480724,91.6927053296,91.9565630196,92.2130845964,92.462431748,92.7047643325,92.9402403186,93.1690157317,93.3912446037,93.6070789285,93.8166686205,94.0201614781,94.217703151,94.4094371113,94.5955046279,94.7760447449,94.9511942633,95.1210877254,95.2858574028,95.4456332871,95.6005430834,95.7507122065,95.8962637794,96.0373186345,96.1739953171,96.3064100903,96.4346769434,96.5589076005,96.6792115321,96.7956959685,96.9084659135,97.0176241612,97.1232713134,97.2255057982,97.3244238901,97.4201197315,97.5126853547,97.6022107053,97.6887836664,97.7724900836,97.8534137906,97.931636636,98.0072385104,98.0802973737,98.1508892837,98.2190884246,98.2849671361,98.3485959427,98.4100435833,98.4693770414,98.5266615751,98.5819607473,98.635336456,98.6868489652,98.7365569351,98.7845174525,98.8307860615,98.8754167939,98.9184621994,98.9599733761,99.0,99.0,99.1262332248,99.2395444895,99.3408495777,99.4310476398,99.511016048,99.5816056897,99.643636748,99.697895009,99.7451287255,99.7860460584,99.8213131038,99.8515525044,99.877342634,99.8992173331,99.9176661642,99.9331351467,99.9460279277,99.9567073332,99.9654972465,99.9726847533,99.9785224951,99.9832311705,99.9870021286,99.99],            
          ],
          type: 'scatter',
          
          types: {
          //  scattery:'scatterx',
          //  lineregy:'spline',
          //  lineyupperCI:'spline',
          //  lineylowerCI:'spline',
           
          },
          // labels: {
          //   //         
          //               format: {
          //                 liney: d3.format('$'),
          //   //               
          //               }
          //           },
          // groups:[['liney','liney1','liney2']],


      },
      axis: {
          x: {  
              tick: {
                // format: d3.format('$,'),
                  fit: false,        
                 },
              show:true,
              label:{
               
                text: 'Time',
                position: 'outer-center'
              },
            
          },
        
          y: {
            
             show: true,
            label: {
              
              text: '% Fraction Failing',
              position: 'outer-middle',
            },  
           tick: {
              format: function (d) { 
                return  d + '%'; 
              }
            },
          },
          
      },
      
      regions: [
        // {axis: 'x',start:1, end: 409, class: 'regionX'},
        // {axis: 'x', start: 2, end: 4, class: 'regionX'},
        // {axis: 'x', start: 5, class: 'regionX'},
        // {axis: 'y', end: 50, class: 'regionY'},
        // {axis: 'y', start: [3.4,1.2], end:[1, 99.9], class: 'regionY'},
        // {axis: 'y', start: 400, class: 'regionY'},
        // {axis: 'y2', end: 900, class: 'regionY2'},
        // {axis: 'y2', start: 1150, end: 1250, class: 'regionY2'},
        // {axis: 'y2', start: 1300, class: 'regionY2'},
    ],
    bindto: '#chartweibull',
    point: {
      r: 2.5,
    },
  },
 
  );

  color: {
    pattern: ['#363FBC', '#FFFFFF', '#FFFFFF']
};
  }
  weibullC3Chart1(responseCdf: any,responsePdf:any){
 
    let pdfPlot = JSON.parse(responsePdf);
    let roundedXPDF: any = [];
   
    pdfPlot.forEach((axis: any) => {
      axis.X.forEach((xaxis: any) => {
        roundedXPDF.push(parseFloat(xaxis).toFixed(3));
      });
    var XaxisPDF = axis.X;
    var y_pdf = axis.Y;
    XaxisPDF = ['xPDF', ...axis.X];
    y_pdf = ['yPDF', ...axis.Y];
   

    let cdfPlot = JSON.parse(responseCdf);
     let roundedXCDF: any = [];
    cdfPlot.forEach((axis:any) => {
      axis.X.forEach((xaxis:any) => {
        roundedXCDF.push(parseFloat(xaxis).toFixed(3));
      });
      var XaxisCDF = axis.X;
      var y_cdf = axis.Y;


      y_cdf = ['yCDF', ...axis.Y];
      XaxisCDF = ['xCDF', ...axis.X];
      console.log('RESULT')
      console.log('y_cdf:',y_cdf)
      console.log('XaxisCDF:',XaxisCDF)
      console.log('y_pdf:',y_pdf)
      console.log('XaxisPDF:',XaxisPDF)
   

  

  
  var chartweibull2 = c3.generate({
   
    data: {
      xs:{
        yCDF:'xCDF',
        yPDF:'xPDF',
      },
        // x: 'xCDF',
        columns: [
          XaxisCDF,
          y_cdf,
          XaxisPDF,
          y_pdf
        ],
        
        types: {
        
            Alpha: 'area-spline'
        }
        
    },
    legend: {
      show: false
  },
    axis: {
      x: {
          type: 'category',
          tick: {
              rotate: -75,
              multiline: false,
             
            //   culling: {
            //     max: 30
            // }
          },
          show:true,
          label:{
            text: 'Duration in months',
            position: 'outer-center'
          },
      },
      y: {
        show: true,
          label: {
            text: 'Probability Density',
            position: 'outer-middle'
          }  
      }
      
  },
  bindto: '#chartweibull2',
  point: {
    r: 1,
  },
});
  
    }) });
 
  

  color: {
    pattern: ['#363FBC', '#FFFFFF', '#FFFFFF']
};
  }

  onSelectEventYear($event:any, year: Misyears) {

  };
}
