import {UfoService} from './ufos/ufo-service';


export class Game {
  static readonly TICK_DURATION_MINUTES = 1;

  private _date: Date = new Date('2032-03-26T11:30:00');

  private ufoSpawner = new UfoService();

  tick(count: number) {
    for (let i = 0; i < count; i++) {
      this.singleTick();
    }
  }

  private singleTick() {
    this._date = new Date(this._date.getTime() + Game.TICK_DURATION_MINUTES * 60000);
    this.ufoSpawner.tick();
  }

  get date(): Date {
    return this._date;
  }
}
