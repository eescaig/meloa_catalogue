import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapComponent } from './map.component';

const mapRoutes: Routes = [
  { path: 'map',  component: MapComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    LeafletModule,
    RouterModule.forChild(mapRoutes)
  ],
  declarations: [MapComponent],
  exports: [
    RouterModule
  ]
})
export class MapModule { }
