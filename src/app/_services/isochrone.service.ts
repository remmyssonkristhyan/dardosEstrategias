import { EventEmitter, Injectable } from '@angular/core';
import { data } from '@here/maps-api-for-javascript';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class IsochroneService {
  emitirIsocrona = new EventEmitter<any>();

  isochrone: {
    mode: string,
    type: string,
    range: string
  };

  constructor() { }

  setIsochrone(data) {
    this.emitirIsocrona.emit(data);
  }


}
