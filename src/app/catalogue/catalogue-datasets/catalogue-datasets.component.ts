import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { CatalogueSemioceanService } from './../services/catalogue-semiocean.service';
import { Page } from './../models/page.model';
import { DatasetList } from '../models/dataset-list.model';

@Component({
  selector: 'app-catalogue-datasets',
  templateUrl: './catalogue-datasets.component.html',
  styleUrls: ['./catalogue-datasets.component.scss']
})
export class CatalogueDatasetsComponent implements OnInit {
  
  organizationList: Observable<DatasetList>;
  groupList: Observable<DatasetList>;
  tagList: Observable<DatasetList>;
  datasetList: Observable<Page<DatasetList>>;
  detail : string;
  totalItems : number;

  labelOrgs : string = 'Organizations';
  labelGroups : string = 'Groups';
  labelTags : string = 'Tags';
  styleSelect : string = 'ancho';

  /* orgForm: FormGroup;
  groupForm: FormGroup;
  tagForm: FormGroup; */
  // Table pagination example 1
  paginators: Array<any> = []; //1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  activePage: number = 1;
  firstVisibleIndex: number = 1;
  lastVisibleIndex: number = 10;

  /* filterForm: FormGroup;
  page: Observable<Dataset>
  pageUrl = new Subject<string>(); */

  constructor (
    private simoceanService: CatalogueSemioceanService,
    private router : Router,
    private fb : FormBuilder
   ) { }

  ngOnInit() {
    this.searchPackageList('200');
    this.getOrganizationList();
    this.getGroupList();
    this.getTagList();

    /* this.orgForm = this.fb.group({organizationControl: ['Choose...']});
    this.groupForm = this.fb.group({groupControl: ['Choose...']});
    this.tagForm = this.fb.group({tagControl: ['Choose...']}); */
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
                            this.setValuesPaginator(this.totalItems);
                          }
                        });
  }

  goToDetail(selected : string) {
    console.log("Detail click " + selected)
    this.router.navigate(['dataset/' + selected]);
  }

  /* onPageChanged(url: string) {
    this.pageUrl.next(url);
  } */
  
  // Table pagination
  setValuesPaginator(totalItem : number) {
    console.log("Paginator ");
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
  }

}
