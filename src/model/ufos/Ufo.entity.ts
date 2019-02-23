import {HasCoords} from '../common/geo.api';
import {normalizeLat, normalizeLong} from '../../app/geoscape/renderer/util/coordinate-helpers';

export class Ufo implements HasCoords {
  private static nextId = 0;

  private _id: number;
  private _lat = 50.941357 + Math.random() * 2;
  private _lng = 6.958307 + Math.random() * 2;

  private speedLat = -0.5 + Math.random();
  private speedLng = -0.5 + Math.random();

  constructor() {
    this._id = Ufo.nextId++;
  }


  move() {
    this._lat += this.speedLat;
    this._lng += this.speedLng;
  }

  get id(): number {
    return this._id;
  }


  get lat(): number {
    return this._lat;
  }

  get lng(): number {
    return this._lng;
  }
}
