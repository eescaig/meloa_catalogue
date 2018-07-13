import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CatalogueModule } from './catalogue/catalogue.module';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';


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
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(catalogueRoutes),
    CatalogueModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
