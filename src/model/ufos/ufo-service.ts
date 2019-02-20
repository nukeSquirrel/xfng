import {UFO_REPO} from './ufo.repo';
import {Ufo} from './Ufo.entity';

export class UfoService {

  private static readonly BASE_CHANCE = 0.15;

  private nextChanceInTicks = 10;

  tick() {
    this.spawnUfo();
    this.moveUfos();
  }

  private spawnUfo() {
    if (this.nextChanceInTicks-- > 0) {
      return;
    }

    let chance: number = UfoService.BASE_CHANCE;
    if (UFO_REPO.ufos.length > 0) {
      chance /= 2 * UFO_REPO.ufos.length;
    }

    if (Math.random() > 1 - chance) {
      UFO_REPO.add(new Ufo());
      console.log('Creating new UFO!');
    }

    // Next chance in 15 - 100 minutes:
    this.nextChanceInTicks = 15 + Math.round(Math.random() * 85);
  }

  private moveUfos() {
    for (let ufo of UFO_REPO.ufos) {
      ufo.move();
    }
  }
}
