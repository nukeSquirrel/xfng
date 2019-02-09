
export class Ufo {
  private id: number;
  lat = 50.941357 + Math.random();
  lng = 6.958307 + Math.random();

  private speedLat = -0.5 + Math.random();
  private speedLng = -0.5 + Math.random();

  move() {
    this.lat += this.speedLat;
    this.lng += this.speedLng;
  }
}
