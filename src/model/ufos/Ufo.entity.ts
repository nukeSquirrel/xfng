import {HasCoords} from '../common/geo.api';
import {normalizeLat, normalizeLong} from '../../app/geoscape/renderer/util/coordinate-helpers';

export class Ufo implements HasCoords {
  private id: number;
  lat = 50.941357 + Math.random() * 2;
  lng = 6.958307 + Math.random() * 2;

  private speedLat = -0.5 + Math.random();
  private speedLng = -0.5 + Math.random();

  move() {
    this.lat += this.speedLat;
    this.lng += this.speedLng;
  }

}
