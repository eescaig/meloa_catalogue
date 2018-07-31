import { MapModule } from './map/map.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, MatButtonModule } from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { CatalogueModule } from './catalogue/catalogue.module';

const catalogueRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '',  component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(catalogueRoutes),
    CatalogueModule,
    MDBBootstrapModule.forRoot(),
    MapModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
