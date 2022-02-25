import { Component } from '@angular/core';
import * as Highcharts from "highcharts";



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],

})
export class NewComponent {
 
  Highcharts: typeof Highcharts = Highcharts;
 
  constructor(){ }


  check(num:any,num2:any){
    console.log('infunction:',num,num2)
  }

//   chartOptions: Highcharts.Options = {
//     xAxis: {
//       crosshair: {
//         color: 'green',
//         width:6,
//       },
//       // crosshair:true,
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],      
//            },
//     yAxis: [{
//        lineWidth: 2,
//        title: {
//          text: 'Beta and gama'
//               }
//     }, {
//     lineWidth: 2,
//     opposite: true,
//     title: {
//         text: 'Alpha'
//     }
// }],

// plotOptions: {
//   series: {
//       cursor: 'pointer',
//       point: {
//           events: {
//               click: function (e: { point: any; }) {
//                     const p = e.point
//                     this.check(p.category);
//                           }.bind(this)
//           },
//       },
//       allowPointSelect: true,
//   }
// },
//     series: [
//       {
//         type: "line",
//         name: 'Alpha',
//         yAxis: 1,
//         // yAxis:'primary',
//         data: [11129.9, 11171.5, 1106.4, 21129.2, 2144.0, 5176.0, 6135.6, 7148.5, 2916.4, 1694.1, 956.6, 544.4],
       
//       },
//       {
//         type: "line",
//         name: 'Beta',
//         // yAxis: 2,
//         data: [144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4, 129.2],
     
//       },
//       {
//         type: "line",
//         name: 'Gama',
//         // yAxis: 2,
//         data: [14.0, 16.0, 35.6, 118.5, 116.4, 124.1, 55.6, 44.4, 79.9, 31.5, 206.4, 139.2],
     
//       },
//     ]
//   };
  


}