import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { CatalogueSemioceanService } from './../services/catalogue-semiocean.service';

@Component({
  selector: 'app-catalogue-datasets',
  templateUrl: './catalogue-datasets.component.html',
  styleUrls: ['./catalogue-datasets.component.scss']
})
export class CatalogueDatasetsComponent implements OnInit {
  
  datasetList: Observable<any[]>;
  detail : string;
  totalItems : number;
  // Table pagination
  paginators: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //
  activePage: number = 1;
  firstVisibleIndex: number = 1;
  lastVisibleIndex: number = 10;

  constructor (
    private simoceanService: CatalogueSemioceanService,
    private router : Router
   ) 
  { }

  ngOnInit() {
    this.searchPackageList();
  }

  searchPackageList() {
    this.simoceanService.getPackageList()
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
    this.activePage = 10;
    this.firstVisibleIndex = this.activePage * 10 - 10 + 1;
    this.lastVisibleIndex = this.activePage * 10;
  }

}
