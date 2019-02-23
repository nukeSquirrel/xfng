import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';
import {UfoService} from './model/ufos/ufo-service';
import {UFO_REPO} from './model/ufos/ufo.repo';
import {Ufo} from './model/ufos/Ufo.entity';

if (AppConfig.production) {
  enableProdMode();
} else {
  console.log('Dev Cheats Enabled!');
  (<any> window).createUfo = () => { UFO_REPO.add(new Ufo()); };
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
