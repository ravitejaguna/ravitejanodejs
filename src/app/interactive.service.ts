import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';
//import { interactive } from '../model/interactive';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractiveService {
  //baseUrl = environment.baseUrl;
  constructor() { }
}
