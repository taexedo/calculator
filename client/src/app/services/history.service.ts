import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HistoryModel} from "../models/history.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/history'

  getHistory(): Observable<HistoryModel[]> {
    return this.http.get<HistoryModel[]>(this.apiUrl);
  }
}
