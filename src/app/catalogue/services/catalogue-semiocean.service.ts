import { DatasetList } from '../models/dataset-list.model';
import { Page } from './../models/page.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogueSemioceanService {

  readonly apiBaseUrl = 'http://catalogue.simocean.pt/api/3/action';
  
  constructor(private http: HttpClient) { }

  getComboContent(customizableURL: string) {
    const customizableListURL = this.apiBaseUrl + '/' + customizableURL;
    return this.http.get<Observable<DatasetList>>(customizableListURL);
  }
  
  getPackageList(limit: string) {
    const packageListURL = this.apiBaseUrl + '/package_list'; //?limit=25
    let paramsLimit = new HttpParams().set('limit', limit);
    return this.http.get<Observable<DatasetList>>(packageListURL.toString(), {params: paramsLimit});
  }

  getPackage(selectedPack : string) {
    const packageListURI = this.apiBaseUrl + '/package_search?q=' + selectedPack;
    return this.http.get(packageListURI.toString());
  }



  // Pruebas
  list(urlOrFilter?: string | object): Observable<Page<DatasetList>> {
    const packageListURI = this.apiBaseUrl + '/package_list';
    return this.queryPaginated<DatasetList>(this.http, packageListURI, urlOrFilter);
  }

  private queryPaginated<T>(http: HttpClient, baseUrl: string, urlOrFilter?: string | object): Observable<Page<T>> {
    let params = new HttpParams();
    let url = baseUrl;
  
    if (typeof urlOrFilter === 'string') {
      // we were given a page URL, use it
      url = urlOrFilter;
    } else if (typeof urlOrFilter === 'object') {
      // we were given filtering criteria, build the query string
      Object.keys(urlOrFilter).sort().forEach(key => {
        const value = urlOrFilter[key];
        if (value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
  
    return http.get<Page<T>>(url, {
      params: params
    });
  }
}
