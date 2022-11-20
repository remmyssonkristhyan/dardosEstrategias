import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MapService } from '../_services/map.service';

@Component({
  selector: 'app-isochrone',
  templateUrl: './isochrone.component.html',
  styleUrls: ['./isochrone.component.scss'],
})
export class IsochroneComponent implements OnInit {
  constructor(private mapService: MapService) {}
  type;
  range = 0;
  ngOnInit(): void {}

  onSubmit(form) {
   form.value.range = form.value.range.toString();
    this.mapService.setIsochrone(form.value);
  }
}
