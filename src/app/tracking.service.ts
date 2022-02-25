import { Injectable } from '@angular/core';

//import tracking interface
import { Tracking } from '../app/tracking';

//import this to make http requests
import {HttpClient} from "@angular/common/http";
import {Observable, forkJoin} from "rxjs";

//we've defined our base url here in the env
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method returns tracking details
   */
  getTrackingInformation(): Observable<Tracking[]> {
    return this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingList`);
  }

  /**
   * This method returns tracking details
   */
  getFailureGroupedInformation(): Observable<Tracking[]> {
    return this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingList`);
  }

  /**
   * This method returns tracking details
   */
  getFailureGroupedInformationByGroupID(groupkey: any): Observable<Tracking[]> {
    return this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingListByGroupID/${groupkey}`);
  }

  /**
   * This method returns groupkey
   */
  getGroupKey(): Observable<Tracking[]> {
    return this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/getGroupKey`);
  }

  /**
   * This method returns groupkey
   */
  getHistogramPlot(): Observable<Blob> {
    //return this.httpClient.get(`${environment.baseUrl}api/histogramPlot`, { responseType: 'blob' });
    return this.httpClient.get<any>(`${environment.baseUrl}api/histogramPlot`);
  }

  // fetchProfileImage(userId: string): Observable<Blob> {
  //   let url = "http://localhost:8080/user/" + userId + "/profileImage";
  //   console.log("Profile image URL is " + url);

  //   return this.http.get(url, { responseType: 'blob' });
  // }
  
  public requestDataFromMultipleSources(groupkey: any): Observable<any[]> {
    let response1 = this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingListByGroupID/${groupkey}`);
    let response2 = this.httpClient.get<any>(`${environment.baseUrl}api/histogramPlotByGroupID/${groupkey}`);
    let response3 = this.httpClient.get<any>(`${environment.baseUrl}api/pdfPlotByGroupID/${groupkey}`);
    let response4 = this.httpClient.get<any>(`${environment.baseUrl}api/cdfPlotByGroupID/${groupkey}`);
    let response5 = this.httpClient.get<any>(`${environment.baseUrl}api/misPlotByGroupID/${groupkey}`);
    let response6 = this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([response1, response2, response3, response4, response5, response6]);
    //return forkJoin([response3, response4]);
  }

  getTrackingListByGroupID(groupkey: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/trackingListByGroupID/${groupkey}`);
  }

  getHistogramPlotByGroupID(groupkey: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/histogramPlotByGroupID/${groupkey}`);
  }

  getPdfPlotByGroupID(groupkey: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/pdfPlotByGroupID/${groupkey}`);
  }

  getCdfPlotByGroupID(groupkey: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/cdfPlotByGroupID/${groupkey}`);
  }

  getMisPlotByGroupID(groupkey: any, midyear: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/misPlotByGroupID/${groupkey}/${midyear}`);
  }

  getSliderDataByDate(prodDate: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/sliderDataByDate/${prodDate}`);
  }

  getTimeSeriesPlotByGroupID(groupkey: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
  }

  public requestDataFromMultipleSourcesTrackingView(groupkey: any): Observable<any[]> {
    let response1 = this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingListByGroupID/${groupkey}`);
    // let response2 = this.httpClient.get<any>(`${environment.baseUrl}api/histogramPlotByGroupID/${groupkey}`);
    // let response3 = this.httpClient.get<any>(`${environment.baseUrl}api/pdfPlotByGroupID/${groupkey}`);
    // let response4 = this.httpClient.get<any>(`${environment.baseUrl}api/cdfPlotByGroupID/${groupkey}`);
    // let response5 = this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
    let response6 = this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    // return forkJoin([response1, response2, response3, response4, response5, response6]);
    return forkJoin([response1, response6]);
  }

  public requestDataFromChartsTrackingView(groupkey: any): Observable<any[]> {
    // let response1 = this.httpClient.get<Tracking[]>(`${environment.baseUrl}api/trackingListByGroupID/${groupkey}`);
    let response2 = this.httpClient.get<any>(`${environment.baseUrl}api/histogramPlotByGroupID/${groupkey}`);
    let response3 = this.httpClient.get<any>(`${environment.baseUrl}api/pdfPlotByGroupID/${groupkey}`);
    let response4 = this.httpClient.get<any>(`${environment.baseUrl}api/cdfPlotByGroupID/${groupkey}`);
    // let response5 = this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
    // let response6 = this.httpClient.get<any>(`${environment.baseUrl}api/timeSeriesByGroupID/${groupkey}`);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    // return forkJoin([response1, response2, response3, response4, response5, response6]);
    return forkJoin([response2, response3,response4]);
  }

  getHome(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}`);
  }
}
