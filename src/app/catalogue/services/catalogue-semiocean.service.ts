import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from 'url';

@Injectable({
  providedIn: 'root'
})
export class CatalogueSemioceanService {

  readonly apiBaseUrl = 'http://catalogue.simocean.pt/api/3/action';
  
  constructor(private http: HttpClient) { }

  getPackageList() {
    const packageListURI = this.apiBaseUrl + '/package_list'; //?limit=25
    let paramsLimit = new HttpParams().set('limit', '200');
    return this.http.get(packageListURI.toString(), {params: paramsLimit});
  }

  getPackage(selectedPack : string) {
    const packageListURI = this.apiBaseUrl + '/package_search?q=' + selectedPack;
    return this.http.get(packageListURI.toString());
  }
}
