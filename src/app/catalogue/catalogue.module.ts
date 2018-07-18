import { CatalogueSemioceanService } from './services/catalogue-semiocean.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatSelectModule, MatOptionModule } from '@angular/material';

import { CatalogueDatasetsComponent } from './catalogue-datasets/catalogue-datasets.component';
import { CatalogueDatasetDetailsComponent } from './catalogue-dataset-details/catalogue-dataset-details.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TransformStringPipe } from './pipes/transform-string-pipe';
import { SelectComponent } from './select/select.component';

const datasetRoutes: Routes = [
  { path: 'dataset',  component: CatalogueDatasetsComponent },
  { path: 'dataset/:detail',  component: CatalogueDatasetDetailsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(datasetRoutes),
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  declarations: [
    CatalogueDatasetsComponent,
    CatalogueDatasetDetailsComponent,
    PaginatorComponent,
    TransformStringPipe,
    SelectComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CatalogueSemioceanService
  ]
})
export class CatalogueModule { }
