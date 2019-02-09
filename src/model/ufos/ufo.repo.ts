import {Ufo} from './Ufo.entity';

export class UfoRepo {
  static instance = new UfoRepo();

  ufos: Ufo[] = [];
}
