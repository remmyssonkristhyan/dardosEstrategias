import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { IsochroneService } from '../_services/isochrone.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-isochrone',
  templateUrl: './isochrone.component.html',
  styleUrls: ['./isochrone.component.scss'],
})
export class IsochroneComponent implements OnInit {
  constructor(private isochrone: IsochroneService) {}
  type;
  range = 0;
  ngOnInit(): void {}

  onSubmit(form) {
   form.value.range = form.value.range.toString();
    this.isochrone.setIsochrone(form.value);
  }
}
