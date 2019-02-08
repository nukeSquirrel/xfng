export function calcPosFromLatLonRad(lat: number, lon: number): [number, number, number] {
  let phi = (90 - lat) * (Math.PI / 180);
  let theta = (lon + 180) * (Math.PI / 180);

  let x = -(7.5 * Math.sin(phi) * Math.cos(theta));
  let z = (7.5 * Math.sin(phi) * Math.sin(theta));
  let y = (7.5 * Math.cos(phi));

  return [x, y, z];
}
