import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'c3/node_modules/@types/d3';


@Component({
  selector: 'app-weibull',
  templateUrl: './weibull.component.html',
  styleUrls: ['./weibull.component.css']
})
export class WeibullComponent  {

  percentage(){
    var chartweibull = c3.generate({
      data: {
          columns: [
              ['sample', 30, 200, 100, 400, 150, 2500]
          ]
      },
      axis : {
          y : {
              tick: {
                  // format: d3.format("$,")
  //                format: function (d) { return "$" + d; }
              }
          }
      }
  });
  }
 



}




 
  
