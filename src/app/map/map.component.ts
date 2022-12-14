import { Component, Input, OnInit } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import * as L from 'leaflet';
import { control, map, tileLayer } from 'leaflet';
import Geocoder from 'leaflet-control-geocoder';
import { MapService } from '../_services/map.service';
import  {heatData} from '../../assets/realworld.10000';
import 'heatmap.js';


declare const HeatmapOverlay: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  private map?: L.Map;
  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

  address = '';
  here = {
    apiKey: 'N9GW7XnvM6mbqaUGAZEuCWceUJY2iOv0V_6HmfOzTfc',
  };
  platform = new H.service.Platform({
    apikey: this.here.apiKey,
  });

  maceio = 'lat=-9.66512&lon=-35.7356';

  geoapifyApiKey = '3f6120b029ff4414a461d81ab5937ffd';
  myGeoJSONLayer;
  marker;
  marKercoords;
  circle;


  constructor(private mapService: MapService) {}

  ngOnInit() {
    const style = 'normal.day';

    const hereTileUrl = `https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/${style}/{z}/{x}/{y}/512/png8?apiKey=${this.here.apiKey}&ppi=320`;
    const hereHibridMap = `https://2.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/hybrid.day/{z}/{x}/{y}/512/png8?apiKey=${this.here.apiKey}&ppi=320`;
    const hereSatelliteMap = `https://2.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/512/png8?apiKey=${this.here.apiKey}`;
    this.map = map('map', {
      center: [-9.66512, -35.7356],
      zoom: 11,
      layers: [tileLayer(hereTileUrl)],
      zoomControl: false,
    });

    const baseMaps = {
      'Mapa Base': tileLayer(hereTileUrl),
      'Hibrido': tileLayer(hereHibridMap),
      'Satelite': tileLayer(hereSatelliteMap),
    };

    var overlayMaps = {
      'Áreas densamente edificadas': tileLayer.wms(
        'https://geoservicos.ibge.gov.br/geoserver/wms',
        {
          layers: 'CGMAT:pbqg22_00_Bc250_2021AreaDensEdifi',
          transparent: true,
          format: 'image/png',
          maxZoom: 18,
          opacity: 0.7,
        }
      ),
      'Rodovias': tileLayer.wms('https://geoservicos.ibge.gov.br/geoserver/wms', {
        layers: 'CGMAT:pbqg22_00_Bc250_2021TrechoRod_complex	',
        transparent: true,
        format: 'image/png',
        maxZoom: 18,
      }),
      'Árranjos populacionais': tileLayer.wms(
        'https://geoservicos.ibge.gov.br/geoserver/wms',
        {
          layers: 'CGMAT:pbqg22_49_ArranjosPopulacionais_ArranjosPopulacionais',
          transparent: true,
          format: 'image/png',
          maxZoom: 18,
          opacity: 0.7,
        }
      ),
    };

    var layerControl = control
      .layers(baseMaps, overlayMaps)
      .addTo(this.map)
      .setPosition('topleft');
    control
      .zoom({
        position: 'bottomright',
      })
      .addTo(this.map);
    this.map.attributionControl.addAttribution('&copy; HERE 2022');

    const GeocoderControl = new Geocoder();
    GeocoderControl.addTo(this.map);
    GeocoderControl.on('markgeocode', function (e) {
      console.log(e);
    });

    this.mapService.emitirIsocrona.subscribe(
      isocrona => this.drawIsoline(isocrona)
    );

    this.mapService.emitirMarcador.subscribe(
      isSelected => {
        if(isSelected) {
          this.map.on('click', e => {
            if(this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marKercoords = e.latlng;
            this.marker = new L.Marker(this.marKercoords, {draggable:true});
            this.map.addLayer(this.marker);
          })
        }
      }
    )

    this.mapService.emitirRaio.subscribe(
      raio => {
        if(this.circle) {
          this.map.removeLayer(this.circle);
        }
        this.circle = L.circle(this.marKercoords, {radius: raio*1000})
        this.map.addLayer(this.circle)
      }
    )

    this.mapService.emitirHeatLayer.subscribe(
      () => {
        // Setting up heat layer config
    const heatLayerConfig = {
      "radius": 5,
      "maxOpacity": .8,
      "scaleRadius": true,
      // property below is responsible for colorization of heat layer
      "useLocalExtrema": true,
      // here we need to assign property value which represent lat in our data
      latField: 'lat',
      // here we need to assign property value which represent lng in our data
      lngField: 'lng',
      // here we need to assign property value which represent valueField in our data
      valueField: 'count'
    };

    // Initialising heat layer and passing config
    const heatmapLayer = new HeatmapOverlay(heatLayerConfig);

    //Passing data to a layer
    heatmapLayer.setData(heatData);
    console.log(heatData);

    //Adding heat layer to a map
    heatmapLayer.addTo(this.map);
      }
    )

    this.mapService.emitirLayer.subscribe(
      layername => {
        Object.keys(baseMaps).forEach((item) => {
          if(layername === 'Hibrido') {
            if(baseMaps['Satelite']) {
              this.map.removeLayer(baseMaps['Satelite']);
            }
            this.map.addLayer(baseMaps['Hibrido'])
          }
          if (layername === 'Mapa Base') {
            if(baseMaps['Hibrido']) {
              this.map.removeLayer(baseMaps['Hibrido']);
            }
            if(baseMaps['Satelite']) {
              this.map.removeLayer(baseMaps['Satelite']);
            }
            this.map.addLayer(baseMaps['Mapa Base'])
          }
          if (layername === 'Satelite') {
            this.map.addLayer(baseMaps['Satelite'])
          }
        });

        Object.keys(overlayMaps).forEach((item) => {
          if(layername === 'Áreas densamente edificadas') {
            this.map.addLayer(overlayMaps['Áreas densamente edificadas'])
          }
          if (layername === 'Árranjos populacionais') {
            this.map.addLayer(overlayMaps['Árranjos populacionais'])
          }
          if (layername === 'Rodovias') {
            this.map.addLayer(overlayMaps['Rodovias'])
          }
        });

        if(layername === 'clear') {
          Object.keys(overlayMaps).forEach((item) => {
            this.map.removeLayer(overlayMaps[item])
          })
        }
      }
    )
  }



  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        let positionCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.map.setView(positionCoords);
      });
    } else {
      alert('Geolocation not supported');
    }
  }

  drawIsoline(data) {
    if(this.myGeoJSONLayer) {
      this.myGeoJSONLayer.remove();
    }

    var requestOptions = {
      method: 'GET',
    };
    fetch(`https://api.geoapify.com/v1/isoline?lat=-9.66512&lon=-35.7356&type=${data.type}&mode=${data.mode}&range=${data.range}&apiKey=3f6120b029ff4414a461d81ab5937ffd`, requestOptions
    )
      .then((response) => response.json())
      .then((geoJSONFeatures) => {
        this.myGeoJSONLayer = L.geoJSON(geoJSONFeatures, {
          style: (feature) => {
            return {
              stroke: true,
              color: '#9933ff',
              weight: 2,
              opacity: 0.7,
              fill: true,
              fillColor: '#7300e6',
              fillOpacity: 0.15,
              smoothFactor: 0.5,
              interactive: false,
            };
          },
        });

        this.myGeoJSONLayer.addTo(this.map);
      });

  }

  // private getCoordinates(query: string) {
  //   return new Promise((resolve, reject) => {
  //       this.geocoder.geocode({ searchText: query }, result => {
  //           if(result.Response.View.length > 0) {
  //               if(result.Response.View[0].Result.length > 0) {
  //                   resolve(result.Response.View[0].Result);
  //               } else {
  //                   reject({ message: "no results found" });
  //               }
  //           } else {
  //               reject({ message: "no results found" });
  //           }
  //       }, error => {
  //           reject(error);
  //       });
  //   });
  // }

}


// myGeoJSONLayer.addTo(this.map);
// https://api.geoapify.com/v1/isoline?lat=39.10052013895695&lon=-76.78959305536686&type=${data.type}&mode=${data.mode}&range=${data.range}&apiKey=3f6120b029ff4414a461d81ab5937ffd
