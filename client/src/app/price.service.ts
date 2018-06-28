import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '.././environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PriceService {
  constructor(private http: HttpClient) { }

  getListData() {
    return this.http.get(environment.apiEndpoint + '/getListData');
  }
}