import {Spherical} from 'three';
import {EARTH_RADIUS} from '../layers/earth-renderer.service';
import {HasCoords} from '../../../../model/common/geo.api';

export function calcPosFromLatLonRad(lat: number, lon: number): [number, number, number] {
  // DEG to RAD:
  lat = normalizeLat(lat) * Math.PI / 180;
  lon = normalizeLong(lon) * Math.PI / 180;

  // Calc:
  let x = (EARTH_RADIUS * Math.cos(lat) * Math.sin(lon));
  let z = (EARTH_RADIUS * Math.cos(lat) * Math.cos(lon));
  let y = (EARTH_RADIUS * Math.sin(lat));

  return [x, y, z];
}

export function calcSphericalFromLatLon(lat: number, lon: number): Spherical {
  let phi = (90 - lat) * (Math.PI / 180); // phi = polar
  let theta = lon * (Math.PI / 180);
  let radius = EARTH_RADIUS;

  let result = new Spherical(radius, phi, theta);
  result.makeSafe();
  return result;
}

export function normalize(geoObject: HasCoords): HasCoords {
  return {
    lat: normalizeLat(geoObject.lat),
    lng: normalizeLong(geoObject.lng)
  };
}

export function normalizeLat(lat: number): number {
  let x = Math.abs(lat % 360);
  let factor = lat < 0 ? -1 : 1;
  if (x <= 90) {
    return factor * x;
  }
  if (x <= 270) {
    return factor * (180 - x);
  }

  // 270 < x < 360:
  return factor * (x - 360);
}

export function normalizeLong(lng: number): number {
  let x = Math.abs(lng % 360);
  let factor = lng < 0 ? -1 : 1;

  if (x <= 180) {
    return factor * x;
  }

  // 180 < x < 360:
  return factor * (x - 360);
}

