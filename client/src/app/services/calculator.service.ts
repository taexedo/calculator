import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http: HttpClient) { }
  apiUrl = 'http://localhost:3000/calculation'

  createCalculation = (expressionObject: {expression: string}) => {
    return this.http.post<{result: string}>(this.apiUrl, expressionObject);
  }
}
