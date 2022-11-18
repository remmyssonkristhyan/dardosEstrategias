import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss'],
})
export class LayersComponent implements OnInit {
  baseLayers = ['Mapa Base', 'Híbrido', 'Satélite'];
  overlays = [
    'Áreas densamente edificadas',
    'Rodovias',
    'Arranjos Populacionais',
  ];

  constructor() {}

  ngOnInit(): void {}
}
