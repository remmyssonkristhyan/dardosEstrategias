import { EventEmitter, Injectable } from '@angular/core';
import { data } from '@here/maps-api-for-javascript';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  emitirIsocrona = new EventEmitter<any>();
  emitirMarcador = new EventEmitter<any>();
  emitirRaio = new EventEmitter<any>();
  isochrone: {
    mode: string,
    type: string,
    range: string
  };

  constructor() { }

  setIsochrone(data) {
    this.emitirIsocrona.emit(data);
  }

  setMarker(data) {
    this.emitirMarcador.emit(data);
  }

  setRadius(data) {
    this.emitirRaio.emit(data);
  }
}
