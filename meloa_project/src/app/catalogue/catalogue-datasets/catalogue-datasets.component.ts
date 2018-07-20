import { DatasetDetail } from './../models/dataset-detail.model';
import { Search } from './../models/search.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { CatalogueSemioceanService } from './../services/catalogue-semiocean.service';
import { DatasetList } from '../models/dataset-list.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-catalogue-datasets',
  templateUrl: './catalogue-datasets.component.html',
  styleUrls: ['./catalogue-datasets.component.css']
})
export class CatalogueDatasetsComponent implements OnInit {
  
  startDate : Date;
  endDate : Date;
  labelOrgs : string = 'Organizations';
  labelGroups : string = 'Groups';
  labelTags : string = 'Tags';
  styleSelect : string = 'ancho';

  selectedOrg : string = "";
  selectedGroup : string = "";
  selectedTag : string = "";
  errorMessage : string = "";

  organizationList: Observable<DatasetList>;
  groupList: Observable<DatasetList>;
  tagList: Observable<DatasetList>;
  datasetList: DatasetDetail[] = []; //Observable<Page<DatasetDetail>>;
  detail : string;
  totalItems : number;
  
  displayedColumns: string[] = ['dataset'];
  dataSource = new MatTableDataSource<DatasetDetail>(this.datasetList);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Table pagination example 1
  //paginators: Array<any> = []; //1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  /* activePage: number = 1;
  firstVisibleIndex: number = 1;
  lastVisibleIndex: number = 10; */

  constructor (
    private simoceanService: CatalogueSemioceanService,
    private router : Router,
    private fb : FormBuilder
   ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    //this.searchPackageList('200');
    this.getOrganizationList();
    this.getGroupList();
    this.getTagList();
  }
  
  search() {
    this.resetValues();
    if(this.selectedOrg!="" || this.selectedGroup!="" || this.selectedTag!="") {
      console.log("Entrando " + this.startDate + " " + this.endDate);
      let objSearch = new Search(this.selectedOrg, this.selectedGroup, this.selectedTag);
      this.simoceanService.getPackageSearch(objSearch)
                          .subscribe((data) => {
                            if(data['success']==true && data['result']['count']>0) {
                              let result = data['result'];
                              console.log(result);
                              this.totalItems = result['count'];
                              this.organizationList = result['search_facets']['organization']['items'].map(g => {return g.name});
                              this.groupList = result['search_facets']['groups']['items'].map(g => {return g.name});
                              this.tagList = result['search_facets']['tags']['items'].map(t => {return t.name});
                              this.datasetList = this.parsePackageResults(result['results']);
                              
                              //this.setValuesPaginator(this.totalItems>200 ? 200 : this.totalItems);
                            }
                            else {
                              this.errorMessage = "Your search has no results";
                            }
                          });
    }
    else {
      this.errorMessage = "You should select at least a filter to search";
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
                            this.totalItems = data['result'].length;
                            //this.setValuesPaginator(this.totalItems);
                          }
                        });
  }

  goToDetail(selected : string) {
    console.log("Detail click " + selected)
    this.router.navigate(['dataset/' + selected]);
  }

  private resetValues() {
    this.errorMessage = "";
    this.totalItems = 0;
    //this.datasetList = [];
    //this.paginators = [];
  }

  private parsePackageResults(results: any[]) : any {
    let items : DatasetDetail[] = [];
    return results.map(item => { //console.log(item) 
        let id: string = item['id'];
        let datasetName : string = item['name'];
        let title : string = item['title'];
        let notes : string = item['notes'];
        
        let contact: string; // extras - {key: "Contact", value: "Instituto Hidrográfico (IH)"}
        let email: string;   // extras - {key: "Contact Email", value: "mail@hidrografico.pt"}
        let creationTime: Date; // extras - {key: "CreationTime", value: "2018-02-23T00:00:00.000000Z"}
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
              if(extra.key==="Topic Category") {
                topicCategory = extra.value;
              }
        });
        
        let groups : string[];  // groups - title or display_name
        groups = item['groups'].map(g => {return g.display_name});
        let tags : string[] // tags - name
        tags = item['tags'].map(t => {return t.display_name});
        
        let dataset = new DatasetDetail(id, datasetName, title, notes, contact, email, creationTime, topicCategory, groups, tags);
        return dataset;
     });
    //console.log(items);
    //return items;
  }

  // Table pagination
  /* setValuesPaginator(totalItem : number) {
    let total : number = totalItem / 10;
    for(var i=1; i<=total; i++) {
        this.paginators.push(i);
    }
  }

  changePage(event: any) {
    
    if (event.target.text >= 1 && event.target.text <= this.totalItems) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
      this.lastVisibleIndex = this.activePage * 10;
    }
  }

  nextPage(event: any) {
    this.activePage += 1;
    this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
    this.lastVisibleIndex = this.activePage * 10;
  }
  previousPage(event: any) {
    this.activePage -= 1;
    this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
    this.lastVisibleIndex = this.activePage * 10;
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
    this.lastVisibleIndex = this.activePage * 10;
  }

  lastPage() {
    this.activePage = 20;
    this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
    this.lastVisibleIndex = this.activePage * 10;
  } */

}
