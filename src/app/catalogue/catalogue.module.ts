import { CatalogueSemioceanService } from './services/catalogue-semiocean.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CatalogueDatasetsComponent } from './catalogue-datasets/catalogue-datasets.component';
import { CatalogueDatasetDetailsComponent } from './catalogue-dataset-details/catalogue-dataset-details.component';

const datasetRoutes: Routes = [
  { path: 'dataset',  component: CatalogueDatasetsComponent },
  { path: 'dataset/:detail',  component: CatalogueDatasetDetailsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(datasetRoutes)
  ],
  declarations: [
    CatalogueDatasetsComponent,
    CatalogueDatasetDetailsComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CatalogueSemioceanService
  ]
})
export class CatalogueModule { }
