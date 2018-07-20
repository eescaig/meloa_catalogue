import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CatalogueSemioceanService } from './../services/catalogue-semiocean.service';
import { DatasetDetail } from './../models/dataset-detail.model';

@Component({
  selector: 'app-catalogue-dataset-details',
  templateUrl: './catalogue-dataset-details.component.html',
  styleUrls: ['./catalogue-dataset-details.component.css']
})
export class CatalogueDatasetDetailsComponent implements OnInit {
  
  paramURL : string;
  detailResults : DatasetDetail[];
  count : number;

  constructor(
    private route: ActivatedRoute,
    private simoceanService: CatalogueSemioceanService
  ) { 
    this.route.params.subscribe(params => this.paramURL = params['detail']);
  }

  ngOnInit() {
    this.searchPackage(this.paramURL);
  }

  searchPackage(selectedPack : string) {
    this.simoceanService.getPackage(selectedPack)
                        .subscribe((data) => {
                          if(data['success']==true) {
                            let resultsAux = data['result'];
                      
                            this.count = resultsAux['count'];
                            this.detailResults = this.parsePackageResults(resultsAux['results']); //JSON.stringify(this.results)
                            console.log(this.detailResults);
                          }
                        });
  }

  private parsePackageResults(results: any[]) : DatasetDetail[] {
    let items : DatasetDetail[] = [];
    items = results.map(item => { //console.log(item) 
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
    return items;
  }

}
