import { CatalogueSemioceanService } from './services/catalogue-semiocean.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatOptionModule, MatIconModule,
          MatTableModule, MatButtonModule, MatNativeDateModule, MatInputModule, MatDatepickerModule, MatDividerModule, MatProgressSpinnerModule } from '@angular/material';

import { CatalogueDatasetsComponent } from './catalogue-datasets/catalogue-datasets.component';
import { CatalogueDatasetDetailsComponent } from './catalogue-dataset-details/catalogue-dataset-details.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TransformStringPipe } from './pipes/transform-string-pipe';
import { SelectComponent } from './select/select.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

const datasetRoutes: Routes = [
  { path: 'dataset',  component: CatalogueDatasetsComponent },
  { path: 'dataset/:detail',  component: CatalogueDatasetDetailsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forChild(datasetRoutes),
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  declarations: [
    CatalogueDatasetsComponent,
    CatalogueDatasetDetailsComponent,
    PaginatorComponent,
    TransformStringPipe,
    SelectComponent,
    DatepickerComponent
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CatalogueSemioceanService
  ]
})
export class CatalogueModule { }
