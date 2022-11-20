import { Component, OnInit } from '@angular/core';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
  isSelected = false;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  onClick(){
    this.isSelected = !this.isSelected;
    this.mapService.setHeatLayer(this.isSelected);
  }

}
