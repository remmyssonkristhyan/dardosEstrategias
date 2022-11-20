import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-radius',
  templateUrl: './radius.component.html',
  styleUrls: ['./radius.component.scss']
})
export class RadiusComponent implements OnInit {
  isSelected = false;
  radius = 0;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
  }

  onInputChange(event: MatSliderChange) {
    this.radius = event.value;
    this.mapService.setRadius(this.radius);
  }

  addMarker(){
    this.isSelected = !this.isSelected;
    this.mapService.setMarker(this.isSelected);
  }

}
