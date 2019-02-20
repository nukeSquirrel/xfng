import {Ufo} from './Ufo.entity';

export class UfoRepo {
  readonly ufos: Ufo[] = [];

  add(ufo: Ufo) {
    this.ufos.push(ufo);
  }
}

export const UFO_REPO = new UfoRepo();
