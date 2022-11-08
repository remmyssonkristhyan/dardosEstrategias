import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mapposition',
  templateUrl: './mapposition.component.html',
  styleUrls: ['./mapposition.component.scss']
})
export class MappositionComponent {
  @Output() notify = new EventEmitter();
}
