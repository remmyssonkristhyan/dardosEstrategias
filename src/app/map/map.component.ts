import { MarkerService } from './../_services/map.service';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map;

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeMarkers(this.map);
  }

  private initMap(): void {

    this.map = L.map('map').setView([-9.665833, -35.735], 15);

    const basemap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    });

    basemap.addTo(this.map);

    // const mundials = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    //     layers: 'SRTM30-Colored-Hillshade',
    //     transparent: true,
    //     format:'image/png',
    //     maxZoom: 19,
    //     opacity: 0.4
    // }).addTo(this.map);

    // var baselayers = {
    //   'OSM': basemap
    // };

    // var overlays = {
    //   'Mundials': mundials
    // }

    // L.control.layers(baselayers, overlays);

  }

}
