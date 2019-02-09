import {UfoRepo} from './ufo.repo';
import {Ufo} from './Ufo.entity';

export class UfoService {

  private static readonly BASE_CHANCE = 0.15;

  private ufoRepo = UfoRepo.instance;
  private nextChanceInTicks = 10;

  tick() {
    this.createUfo();
    this.moveUfos();
  }

  private createUfo() {
    if (this.nextChanceInTicks-- > 0) {
      return;
    }

    let chance: number = UfoService.BASE_CHANCE;
    if (this.ufoRepo.ufos.length > 0) {
      chance /= 2 * this.ufoRepo.ufos.length;
    }

    if (Math.random() > 1 - chance) {
      this.ufoRepo.ufos.push(new Ufo());
      console.log('Creating new UFO!');
    }

    // Next chance in 15 - 100 minutes:
    this.nextChanceInTicks = 15 + Math.round(Math.random() * 85);
  }

  private moveUfos() {
    for (let ufo of this.ufoRepo.ufos) {
      ufo.move();
    }
  }
}
