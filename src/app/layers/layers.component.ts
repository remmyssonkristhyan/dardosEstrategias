import { MapService } from './../_services/map.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent implements OnInit {
  baseLayers = ['Mapa Base', 'Hibrido', 'Satelite'];
  overlays = [
    'Áreas densamente edificadas',
    'Rodovias',
    'Árranjos populacionais',
  ];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {}

  changeLayer(data) {
    this.mapService.setLayer(data);
  }
}
