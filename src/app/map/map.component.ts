import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  
  streepMap = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' });
  
  wmsMap = tileLayer.wms('http://localhost:8080/geoserver/nyc/wms', {
              layers: 'nyc:nyc_buildings',
              format: 'image/png',
              transparent: true,
              crs: L.CRS.EPSG3857
            });
  
            options = {
    layers: [this.streepMap, this.wmsMap],
    zoom: 4,
    center: latLng(51.879966, -70.726909)
  };
  

  constructor() { }

  ngOnInit() {
    
  }

}
