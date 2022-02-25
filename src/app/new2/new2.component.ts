import { Component, OnChanges, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";
import * as c3 from 'c3';

@Component({
  selector: 'app-new2',
  templateUrl: './new2.component.html',
  styleUrls: ['./new2.component.css']
})
export class New2Component implements OnInit {
  // chart:any
  ngOnInit(): void {
   
  }
  public chart = c3.generate({
    data: {
        columns: [
            ['data1', 300, 350, 300, 0, 0, 0],
            ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
            data1: 'area',
            data2: 'area-spline'
        }
    }
});






   

 
}
