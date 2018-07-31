import { DatasetDetail } from './../models/dataset-detail.model';
import { Search } from './../models/search.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { CatalogueSemioceanService } from './../services/catalogue-semiocean.service';
import { DatasetList } from '../models/dataset-list.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import Utils from '../utils';

@Component({
  selector: 'app-catalogue-datasets',
  templateUrl: './catalogue-datasets.component.html',
  styleUrls: ['./catalogue-datasets.component.css']
})
export class CatalogueDatasetsComponent implements OnInit {
  
  startDate : Date;
  endDate : Date;
  styleSelect : string = 'ancho';
  defaultValue : string = 'Choose...';
  selectedOrg : string = "";
  selectedGroup : string = "";
  selectedTag : string = "";
  errorMessage : string = "";
  resetCombos : boolean = false;

  organizationList: Observable<DatasetList>;
  groupList: Observable<DatasetList>;
  tagList: Observable<DatasetList>;
  datasetList: DatasetDetail[];
  totalItems : number;
  private searchSubscription: Subscription;

  displayedColumns: string[] = ['dataset'];
  dataSource : MatTableDataSource<DatasetDetail>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (
    private simoceanService: CatalogueSemioceanService,
    private router : Router) 
    {}

  ngOnInit() {
    this.getOrganizationList();
    this.getGroupList();
    this.getTagList();
  }
  
  search() {
    this.resetValues();
      console.log("selectedOrg " + this.selectedOrg + "startDate " + this.startDate + " endDate " + this.endDate);
      let objSearch = this.validations(this.selectedOrg, this.selectedGroup, this.selectedTag, this.startDate, this.endDate);
      if(objSearch!==undefined) { //this.errorMessage===""
      console.log(objSearch.toString());
        //let objSearch = new Search(this.selectedOrg, this.selectedGroup, this.selectedTag, this.startDate, this.endDate);
        
        this.searchSubscription = this.simoceanService.getPackageSearch(objSearch)
                            .subscribe((data) => {
                              if(data['success']==true && data['result']['count']>0) {
                                let result = data['result'];
                                //console.log(result);
                                //this.totalItems = result['count'];
                                this.organizationList = result['search_facets']['organization']['items'].map(g => {return g.name});
                                this.groupList = result['search_facets']['groups']['items'].map(g => {return g.name});
                                this.tagList = result['search_facets']['tags']['items'].map(t => {return t.name});
                                this.datasetList = Utils.parsePackageResults(result['results']);
                                this.totalItems = this.datasetList.length;
                                
                                this.setDatasetValues(this.datasetList, this.paginator);
                                console.log(this.datasetList);
                              }
                              else {
                                this.errorMessage = "Your search has no results";
                              }
                            });
      }
  }

  getOrganizationList() {
    const organizationListURL : string = 'organization_list';
    this.simoceanService.getComboContent(organizationListURL)
                        .subscribe((data) => {
                          if(data['success']==true) {
                            this.organizationList = data['result'];
                          }
    });
  }

  getGroupList() {
    const groupListURL : string = 'group_list';
    this.simoceanService.getComboContent(groupListURL)
                        .subscribe((data) => {
                          if(data['success']==true) {
                            this.groupList = data['result'];
                          }
    });
  }

  getTagList() {
    const tagListURL : string = 'tag_list';
    this.simoceanService.getComboContent(tagListURL)
                        .subscribe((data) => {
                          if(data['success']==true) {
                            this.tagList = data['result'];
                          }
    });
  }

  searchPackageList(limit: string) {
    this.simoceanService.getPackageList(limit)
                        .subscribe((data) => {
                          if(data['success']==true) {
                            this.datasetList = data['result'];
                          }
                        });
  }

  goToDetail(selected : string) {
    console.log("Detail click " + selected)
    this.router.navigate(['dataset/' + selected]);
  }

  /* ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  } */

  reset() {
    this.resetValues();
    this.ngOnInit();
    this.selectedOrg = "";
    this.selectedGroup = "";
    this.selectedTag = "";
    this.startDate = undefined;
    this.endDate = undefined;
    this.resetCombos = true;
  }
  
  private setDatasetValues(datasetList: DatasetDetail[], paginator: MatPaginator) {
    this.dataSource = new MatTableDataSource<DatasetDetail>(datasetList);
    this.dataSource.paginator = paginator;
  }

  private resetValues() {
    this.errorMessage = "";
    this.totalItems = 0;
    this.datasetList = [];
    this.setDatasetValues(this.datasetList, this.paginator);
    this.resetCombos = false;
  }
  
  private validations(selectedOrg: string, selectedGroup: string, selectedTag: string, startTime: Date, stopTime: Date) : Search {
    
    let objSearch : Search = this.validationsDates(selectedOrg, selectedGroup, selectedTag, startTime, stopTime);
    
    if(startTime===undefined && stopTime===undefined && this.validateSelect(selectedOrg) && this.validateSelect(selectedGroup) && this.validateSelect(selectedTag)) {
      this.errorMessage = "You should select at least a filter to search";
      return;
      //console.log(message);
    }
    return objSearch;
  }

  private validateSelect(value : string) : boolean {
    return value==="" || value===this.defaultValue;
  }

  private validationsDates(selectedOrg: string, selectedGroup: string, selectedTag: string, startTime: Date, stopTime: Date) : Search {
    let tempEndDate, tempStartDate : Date;
    if(startTime!==undefined && stopTime===undefined) {
       //console.log("Primer if startTime");
      tempStartDate = startTime;
      tempEndDate = startTime;
    }
    else if(startTime===undefined && stopTime!==undefined) {
      //console.log("Segundo if stopTime");
      tempStartDate = stopTime;
      tempEndDate   = stopTime;
    }
    else if(startTime!==undefined && stopTime!==undefined) {
      //console.log("Tercer if " + (stopTime.getTime() > startTime.getTime()));
      if(startTime!==null && stopTime!==null && (startTime.getTime() > stopTime.getTime())) {
        this.errorMessage = "The 'End date' must be greater than the 'start date'";
        return;
      }
      tempStartDate = startTime; 
      tempEndDate   = stopTime;
    }
    
    return new Search(selectedOrg, selectedGroup, selectedTag, tempStartDate, tempEndDate);
  }

  /* private parsePackageResults(results: any[]) {
    //let items : Observable<DatasetDetail>[];
    return results.map(item => { //console.log(item) 
        let id: string = item['id'];
        let datasetName : string = item['name'];
        let title : string = item['title'];
        let notes : string = item['notes'];
        
        let contact: string; // extras - {key: "Contact", value: "Instituto Hidrográfico (IH)"}
        let email: string;   // extras - {key: "Contact Email", value: "mail@hidrografico.pt"}
        let creationTime: Date; // extras - {key: "CreationTime", value: "2018-02-23T00:00:00.000000Z"}
        let startTime: Date;
        let stopTime: Date;
        let topicCategory : string; // extras - {key: "Topic Category", value: "oceans"}
        item['extras'].map(extra => { 
              if(extra.key==="Contact") {
                contact = extra.value;
              } 
              if(extra.key==="Contact Email") {
                email = extra.value;
              }
              if(extra.key==="CreationTime") {
                creationTime = extra.value;
              }
              if(extra.key==="StartTime") {
                startTime = extra.value;
              }
              if(extra.key==="StopTime") {
                stopTime = extra.value;
              }
              if(extra.key==="Topic Category") {
                topicCategory = extra.value;
              }
        });
        
        let groups : string[];  // groups - title or display_name
        groups = item['groups'].map(g => {return g.display_name});
        let tags : string[] // tags - name
        tags = item['tags'].map(t => {return t.display_name});
        
        return new DatasetDetail(id, datasetName, title, notes, contact, email, creationTime, startTime, stopTime, topicCategory, groups, tags);
     });
     
    //console.log(items);
  } */

}
