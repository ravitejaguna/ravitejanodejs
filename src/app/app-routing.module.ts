import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InteractiveComponent } from './interactive/interactive.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TimeseriesComponent } from './timeseries/timeseries.component';
import { MisplotComponent } from './misplot/misplot.component';
import { Timeseries2Component } from './timeseries2/timeseries2.component';
import { WeibullComponent } from './weibull/weibull.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'interactive', component: InteractiveComponent },
  { path: 'tracking', component: TrackingComponent },
 
  { path: 'timeseriesviz', component: Timeseries2Component },
  { path: 'weibullviz', component: WeibullComponent },
  { path: 'misplotviz/:id', component: MisplotComponent },
  { path: 'login', component: LoginComponent },
  //Wild Card Route
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
