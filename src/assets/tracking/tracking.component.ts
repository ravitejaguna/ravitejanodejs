import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import {Tracking} from "../tracking";
import {TrackingService} from "../tracking.service";

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
//import { delay } from 'rxjs/internal/operators/delay';

import { NgxSpinnerService } from "ngx-spinner";

//import * as newdata from './data';

declare const Plotly:any;

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
  //@ViewChild('chart') chart!: ChartComponent;
  //@ViewChild('chart', {static: true}) chart!: ChartComponent;
  //chartx
  //@ViewChild(MatPaginator) paginator!: MatPaginator;

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

  //PDF
  public lineChartLabels!: Label[];
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];
  public lineChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public lineChartColors: Color[] = [];
  public lineChartOptions: ChartOptions = {};

  //Time Series
  public lineTimeChartLabels!: Label[];
  public lineTimeChartType: ChartType = 'line';
  public lineTimeChartLegend = true;
  public lineTimeChartPlugins = [];
  public lineTimeChartData!:  ChartDataSets[];
  //public lineChartOptions: any = {};
  public lineTimeChartColors: Color[] = [];
  public lineTimeChartOptions: ChartOptions = {};

  public tracking: Tracking[] = [];
  public groupKey: any;
  public filteredGroupKey: any;
  public groupKeyDropdown: any;
  public selectedGroupKey: any;

  // columns we will show on the table
  //public displayedColumns: string[] = ['Parameter', 'Point_Estimate', 'Standard_Error', 'Lower_CI', 'Upper_CI', 'group_key', 'Date_of_computation', 'seag', 'mileage', 'total_cost', 'strata_unique_id', 'vehicle_production_date', 'vehi_engine_series', 'days_to_failure', 'month_to_failure'];
  public displayedColumns: string[] = ['Parameter', 'Point_Estimate', 'Standard_Error', 'Lower_CI', 'Upper_CI'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Tracking>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatPaginator) paginator: MatPaginator;

  ////dependency injection
  constructor(
    private trackingApiService: TrackingService,
    private httpService: HttpClient,
    private sanitizer: DomSanitizer,
    private changeDetectorRefs: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private router: Router, 
    private activatedRoute: ActivatedRoute
    ) {}

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();
    this.loadingData = true;
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.trackingApiService.getGroupKey().subscribe(groupKey => {
      this.groupKeyDropdown = groupKey;
      this.groupKeyDropdown = this.groupKeyDropdown.map((a:any) => a.GroupKey);
    });
  }

  loadImage() {
    this.trackingApiService.getHistogramPlot().subscribe((result: any) => {
      console.log("Result ==> ", result);
      this.img = result;
      let objectURL = 'data:image/jpeg;base64,' + result.ImageBytes;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  loadImageByGroupID(groupKey:any) {
    this.trackingApiService.getHistogramPlotByGroupID(groupKey).subscribe((result: any) => {
      console.log("Result ==> ", result);
      this.img = result;
      let objectURL = 'data:image/jpeg;base64,' + result.ImageBytes;
      this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  /**
   * This method returns tracking details
   */
  getTrackingData() {
    //this.trackingApiService.getTrackingInformation()
    this.trackingApiService.getFailureGroupedInformation()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
        //this.getGroupKey();
        console.log(this.removeDuplicates(this.dataSource.data, 'group_key'));
        this.groupKeyDropdown = this.removeDuplicates(this.dataSource.data, 'group_key');
        this.groupKeyDropdown = this.groupKeyDropdown.map((a:any) => a.group_key);
        console.log(this.groupKeyDropdown);

        this.loadImage();

        // this.httpService.get('http://localhost:4000/api/histogramPlot', { responseType: 'blob' }).subscribe(result => {
        //   console.log(result);
        //   return result;
        // });
        //
      });
  }

  /**
   * This method returns groupkey details
   */
  getGroupKey() {
    this.trackingApiService.getGroupKey()
      .subscribe((res)=>{
        console.log(res);
        this.groupKeyDropdown = res;
      })
  }

  filterByGroupID() {
    this.spinner.show();
    this.loadingData = false;
    //this.refreshComponent();
    console.log(this.selectedGroupKey);
    // let groupKey = this.groupKey;
    // var wantedData = this.dataSource.data.filter(function(i) {
    //   console.log(i.group_key);
    //   //console.log(groupKey);
    //   return i.group_key == groupKey;
    // });
    // console.log(wantedData);
    // this.dataSource.data = wantedData;
    //
    //getFailureGroupedInformation
    //this.trackingApiService.getTrackingInformation()
    //
    /*
    this.trackingApiService.getFailureGroupedInformation()
      .subscribe((res) => {
        //console.log(res);
        //console.log(this.selectedGroupKey.GroupKey);
        this.dataSource.data = res;
        //let groupKey = this.groupKey;
        let groupKey = this.selectedGroupKey;
        var filterData = this.dataSource.data.filter(function(i) {
          console.log(i.group_key);
          console.log(groupKey);
          return i.group_key == groupKey;
        });
        this.dataSource.data = filterData;
      });
      */
      //
      /*
      this.trackingApiService.getFailureGroupedInformationByGroupID(this.selectedGroupKey)
      .subscribe((result) => {
        console.log(result);
        this.dataSource.data = result;
        this.loadImageByGroupID(this.selectedGroupKey);
      });
      */

    /*
    this.trackingApiService.requestDataFromMultipleSources(this.selectedGroupKey).subscribe(responseList => {
    //this.trackingApiService.requestDataFromMultipleSources1(this.selectedGroupKey).pipe(delay(5000)).subscribe(responseList => {
      console.log(responseList);
    });
    */

    /*
    this.trackingApiService.getPdfPlotByGroupID(this.selectedGroupKey)
        .subscribe((result:any) => {
          let objectURL2 = 'data:image/jpeg;base64,' + result.ImageBytes;
          this.pdfChart = this.sanitizer.bypassSecurityTrustUrl(objectURL2);
      });

      this.trackingApiService.getCdfPlotByGroupID(this.selectedGroupKey)
      .subscribe((result:any) => {
        let objectURL3 = 'data:image/jpeg;base64,' + result.ImageBytes;
        this.cdfChart = this.sanitizer.bypassSecurityTrustUrl(objectURL3);
      });
      */
    //this.loadingData = true;
    this.trackingApiService.getTrackingListByGroupID(this.selectedGroupKey).subscribe(responseTracking => {
      //console.log(responseTracking);
      //this.loadingData = false;
      this.dataSource.data = responseTracking;
      this.trackingApiService.getHistogramPlotByGroupID(this.selectedGroupKey).subscribe(responseHistogram => {
        //console.log(responseHistogram);
        if(responseHistogram) {
          this.histogramChart = responseHistogram;
          //console.log("Histogram Plotly: ", this.histogramChart);
          //
          let failure: any[] = [];

          this.histogramChart.forEach((x: any) => {
            //console.log(typeof(x.month_to_failure));
            //console.log(x.month_to_failure);
            failure.push(x.month_to_failure);
          });
          //
          //console.log(failure);
          this.histogramPlotly(failure);
        }
        //if(responseHistogram.message == "histogram") {
          //this.changeDetectorRefs.detectChanges();
          //this.histogramImageURL = "../../assets/graph/histogram.png";
          //this.histogramImageURL = "../../assets/graph/histogram.png";
          //this.histogramImageURL = 'http://localhost:4200/assets/graph/histogram.png';
          //console.log(this.histogramImageURL);
        //}
        this.trackingApiService.getPdfPlotByGroupID(this.selectedGroupKey).subscribe(responsePDF => {
          //console.log(responsePDF);
          this.probabilityDistributionChart(responsePDF);
          //
          this.trackingApiService.getCdfPlotByGroupID(this.selectedGroupKey).subscribe(responseCDF => {
            if(responseCDF.message == "cdf") {
              //this.changeDetectorRefs.detectChanges();
              //this.cdfImageURL = "../../assets/graph/cdf.png";
              this.changeDetectorRefs.detectChanges();
              let objectURLCDF = 'data:image/jpeg;base64,' + responseCDF.ImageBytes;
              this.cdfImageURL = this.sanitizer.bypassSecurityTrustUrl(objectURLCDF);
            }
            this.trackingApiService.getMisPlotByGroupID(this.selectedGroupKey).subscribe(responseMIS => {
              if(responseMIS.message == "misplot") {
                //this.changeDetectorRefs.detectChanges();
                //this.misImageURL = "../../assets/graph/misplot.png";
                this.changeDetectorRefs.detectChanges();
                let objectURLMIS = 'data:image/jpeg;base64,' + responseMIS.ImageBytes;
                this.misImageURL = this.sanitizer.bypassSecurityTrustUrl(objectURLMIS);
              }
              this.trackingApiService.getTimeSeriesPlotByGroupID(this.selectedGroupKey).subscribe(responseTimeSeries => {
                this.spinner.hide();
                this.timeseriesNg2Chart_1(responseTimeSeries.Alpha, responseTimeSeries.Beta, responseTimeSeries.Gamma);
              });
            });
          });
        }); 
      });
    });

    //
    
    //
  }

  onRowClicked(row:any) {
    console.log('Row clicked: ', row);
  }

  removeDuplicates(originalArray:any, prop:any) {
    var newArray:any = [];
    var lookupObject:any  = {};

    for(var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  
  refreshComponent() {
    this.router.navigate([this.router.url])
  }

  histogramPlotly(x: any) {
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

    // hide the modebar (hover bar) buttons, plotly logo. show plotly tooltips
    //var defaultPlotlyConfiguration = { modeBarButtonsToRemove: ['sendDataToCloud', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'lasso2d', 'select2d'], displaylogo: false, showTips: true };
    var layout = {
      height: 400,
      width: 600,
      title: 'Histogram Chart',
      xaxis: {title: "Month to failure"},
      yaxis: {title: "Count"}
      };

    Plotly.newPlot('histogramChart', data, layout, {displayModeBar: false});
  }

  timeseriesPlotly(productionMonthAlpha: any, pointEstimateAlpha: any, productionMonthBeta: any, pointEstimateBeta: any, productionMonthGamma: any, pointEstimateGamma: any) {
    //
    this.productionGraph = {
      data: [
        {
          x: productionMonthAlpha,
          y: pointEstimateAlpha,
          type: 'scatter',
          name: 'Eta (Scale)',
        },
        {
          x: productionMonthBeta,
          y: pointEstimateBeta,
          type: 'scatter',
          name: 'Beta (Shape)',
        },
        {
          x: productionMonthGamma,
          y: pointEstimateGamma,
          type: 'scatter',
          name: 'Gamma (Location)',
        },
      ],
      layout: {
        responsive: true,
        title: { text: 'Time Serise Plot' },
        xaxis: { 
          title: { text: "Production Month" },
        },
        yaxis: {
          title: { text: "Point Entimate" },
        },
      }
    };
    //
    //console.log(this.productionGraphContainer);
    //console.log(this.productionGraphContainer.nativeElement);
    //console.log(this.productionGraph.data);
    //
    Plotly.newPlot(
      this.productionGraphContainer.nativeElement,
      this.productionGraph.data,
      this.productionGraph.layout,
      this.productionGraph.config
    );
    //
  }

  probabilityDistributionChart(dataPDF: any) {
    console.log(dataPDF);
    this.lineChartData = [
      { data: dataPDF.Y, label: 'Alpha', fill: false, borderColor: 'red', showLine: false },
    ];
    this.lineChartLabels = dataPDF.X;
    //this.lineChartOptions = {
      //responsive: true,
    //};
    this.lineChartOptions = {
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
    };
    this.lineChartColors = [
      {
        borderColor: 'blue',
        backgroundColor: 'rgb(242, 242, 242)',
      },
    ];
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';
  }

  timeseriesNg2Chart(productionMonthAlpha: any, pointEstimateAlpha: any, productionMonthBeta: any, pointEstimateBeta: any, productionMonthGamma: any, pointEstimateGamma: any) {
    this.lineTimeChartData = [{ 
      data: [pointEstimateAlpha], 
      label: 'Alpha'
      },
      { 
        data: [pointEstimateBeta], 
        label: 'Beta'
      },
      { 
        data: [pointEstimateGamma], 
        label: 'Gamma'
      }
    ];
    this.lineTimeChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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
    };
    this.lineTimeChartColors = [
      {
        borderColor: 'blue',
        backgroundColor: 'rgb(242, 242, 242)',
      },
    ];
    this.lineTimeChartLegend = true;
    this.lineTimeChartPlugins = [];
    this.lineTimeChartType = 'line';
  }

  timeseriesNg2Chart_1(Alpha: any, Beta: any, Gamma: any) {
    this.lineTimeChartData = [{ 
      data: Gamma.Point_Estimate, 
      label: 'Alpha'
      },
      { 
        data: Gamma.Point_Estimate, 
        label: 'Beta'
      },
      { 
        data: Gamma.Point_Estimate, 
        label: 'Gamma'
      }
    ];
    this.lineTimeChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
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
    };
    this.lineTimeChartColors = [
      {
        borderColor: 'blue',
        backgroundColor: 'rgb(242, 242, 242)',
      },
    ];
    this.lineTimeChartLegend = true;
    this.lineTimeChartPlugins = [];
    this.lineTimeChartType = 'line';
  }
}
