import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgxSpinnerModule } from "ngx-spinner";

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { HeaderComponent } from './header/header.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { TrackingComponent } from './tracking/tracking.component';
import { HomeComponent } from './home/home.component';
import { TimeseriesComponent } from './timeseries/timeseries.component';
import { MisplotComponent } from './misplot/misplot.component';
import { Timeseries2Component } from './timeseries2/timeseries2.component';
import { WeibullComponent } from './weibull/weibull.component';
// import { HighchartComponent } from './highchart/highchart.component';
import { LineAnnotationComponent } from './line-annotation/line-annotation.component';
import { NewComponent } from './new/new.component';
// import { HighchartsService } from './new/highcharts.service';
import { ChartModule } from 'angular2-highcharts';
import { New2Component } from './new2/new2.component';
import { HighchartComponent } from './highchart/highchart.component';
import { HighchartRangeComponent } from './highchart-range/highchart-range.component';
// import highcharts from 'highcharts';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    InteractiveComponent,
    TrackingComponent,
    HomeComponent,
    TimeseriesComponent,
    MisplotComponent,
    Timeseries2Component,
    WeibullComponent,
    // HighchartComponent,
    LineAnnotationComponent,
    NewComponent,
    New2Component,
    HighchartComponent,
    HighchartRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    ChartsModule,
    NgxSpinnerModule,
    // ChartModule.forRoot(highcharts) 
  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
