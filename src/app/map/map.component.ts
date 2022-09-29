import { MarkerService } from './../_services/map.service';
import { Component } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' })
    ],
    zoom: 12,
	  center: latLng(-9.665833, -35.735)
  }

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Áreas densamente edificadas': tileLayer.wms('https://geoservicos.ibge.gov.br/geoserver/wms', {layers: 'CGMAT:pbqg22_00_Bc250_2021AreaDensEdifi', transparent: true, format: 'image/png', maxZoom: 18, opacity: 0.7}),
      'Rodovias': tileLayer.wms('https://geoservicos.ibge.gov.br/geoserver/wms', {layers: 'CGMAT:pbqg22_00_Bc250_2021TrechoRod_complex	', transparent: true, format: 'image/png', maxZoom: 18}),
      'Árranjos populacionais': tileLayer.wms('https://geoservicos.ibge.gov.br/geoserver/wms', {layers: 'CGMAT:pbqg22_49_ArranjosPopulacionais_ArranjosPopulacionais', transparent: true, format: 'image/png', maxZoom: 18, opacity: 0.7})
    }
  }

  constructor(private markerService: MarkerService) { }

}
