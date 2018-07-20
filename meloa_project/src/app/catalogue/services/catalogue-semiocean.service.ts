import { Search } from './../models/search.model';
import { DatasetList } from '../models/dataset-list.model';
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
  
  getPackageSearch(objectSearch: Search) {
    let packageListURL = this.apiBaseUrl + '/package_search?';
    const params = '&facet.field=organization&facet.field=groups&facet.field=tags&rows=40000';
    let addOrgs = "";
    let addGroups = "";
    let addTags = "";
    //http://catalogue.simocean.pt/api/3/action/package_search?fq=organization%3A%22ipma%22+groups%3A%22sea-wave-direction-swd%22+tags%3A%22Dire%C3%A7%C3%A3o+m%C3%A9dia+das+ondas%22&facet.field=organization&facet.field=groups&facet.field=tags
    if(objectSearch!=undefined) {
       let filters : number = 0;
       if(objectSearch.organizations.length>0) {
          addOrgs = 'organization:' + '"' + objectSearch.organizations  + '"';
          packageListURL = filters==0 ? (packageListURL + 'fq=' + addOrgs) : '';
          filters++;
       }
       if(objectSearch.groups.length>0) {
          addGroups = 'groups:'  + '"' + objectSearch.groups  + '"';
          packageListURL = filters==0 ? (packageListURL + 'fq=' + addGroups) : (packageListURL + '+' + addGroups);
          filters++;
       }
       if(objectSearch.tags.length>0) {
          addTags = 'tags:'  + '"' + objectSearch.tags  + '"';
          packageListURL = filters==0 ? (packageListURL + 'fq=' + addTags) : (packageListURL + '+' + addTags);
          filters++;
       }
    }
    
    packageListURL = packageListURL + params;
    console.log(packageListURL);
    return this.http.get(packageListURL);
  }

  getPackageList(limit: string) {
    const packageListURL = this.apiBaseUrl + '/package_list'; //?limit=25
    let paramsLimit = new HttpParams().set('limit', limit);
    return this.http.get<Observable<DatasetList>>(packageListURL.toString(), {params: paramsLimit});
  }

  getPackage(selectedDataset : string) {
    const packageListURL = this.apiBaseUrl + '/package_search?q=' + selectedDataset;
    return this.http.get(packageListURL.toString());
  }

}
