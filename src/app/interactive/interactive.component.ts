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

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  constructor(
    private trackingApiService: TrackingService,
    private httpService: HttpClient,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    //
  }

  filterByID() {
    console.log("Hello World!!!");
    this.spinner.show();
    this.trackingApiService.getHome().subscribe(responseHome => {
      this.spinner.hide();
      console.log(responseHome);
    });
  }
}
